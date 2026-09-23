"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./ImageTrail.css";

type Point = { x: number; y: number };

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(
  e: MouseEvent | TouchEvent,
  rect: DOMRect,
): Point {
  const touch = "touches" in e ? e.touches[0] : undefined;
  const clientX = touch?.clientX ?? ("clientX" in e ? e.clientX : 0);
  const clientY = touch?.clientY ?? ("clientY" in e ? e.clientY : 0);
  return { x: clientX - rect.left, y: clientY - rect.top };
}

function getMouseDistance(p1: Point, p2: Point) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

class ImageItem {
  el: HTMLElement;
  inner: HTMLElement | null;
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect: DOMRect | null = null;
  private onResize: () => void;

  constructor(el: HTMLElement) {
    this.el = el;
    this.inner = el.querySelector(".image-trail__inner");
    this.onResize = () => {
      gsap.set(this.el, this.defaultStyle);
      this.getRect();
    };
    this.getRect();
    window.addEventListener("resize", this.onResize);
  }

  getRect() {
    this.rect = this.el.getBoundingClientRect();
  }

  destroy() {
    window.removeEventListener("resize", this.onResize);
  }
}

class ImageTrailVariant1 {
  container: HTMLElement;
  images: ImageItem[];
  imagesTotal: number;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 80;
  mousePos: Point = { x: 0, y: 0 };
  lastMousePos: Point = { x: 0, y: 0 };
  cacheMousePos: Point = { x: 0, y: 0 };
  rafId: number | null = null;
  destroyed = false;

  private handlePointerMove: (ev: MouseEvent | TouchEvent) => void;
  private initRender: (ev: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.images = [...container.querySelectorAll<HTMLElement>(".image-trail__img")].map(
      (img) => new ImageItem(img),
    );
    this.imagesTotal = this.images.length;

    this.handlePointerMove = (ev) => {
      if ("touches" in ev) ev.preventDefault();
      this.mousePos = getLocalPointerPos(ev, this.container.getBoundingClientRect());
    };

    this.initRender = (ev) => {
      this.mousePos = getLocalPointerPos(ev, this.container.getBoundingClientRect());
      this.cacheMousePos = { ...this.mousePos };
      this.rafId = requestAnimationFrame(() => this.render());
      container.removeEventListener("mousemove", this.initRender);
      container.removeEventListener("touchmove", this.initRender);
    };

    container.addEventListener("mousemove", this.handlePointerMove);
    container.addEventListener("touchmove", this.handlePointerMove, { passive: false });
    container.addEventListener("mousemove", this.initRender);
    container.addEventListener("touchmove", this.initRender, { passive: false });
  }

  render() {
    if (this.destroyed) return;

    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    this.rafId = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    this.zIndexVal += 1;
    this.imgPosition =
      this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    if (!img?.rect) return;

    gsap.killTweensOf(img.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: "power1",
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0,
      )
      .to(
        img.el,
        {
          duration: 0.4,
          ease: "power3",
          opacity: 0,
          scale: 0.2,
        },
        0.4,
      );
  }

  onImageActivated() {
    this.activeImagesCount += 1;
    this.isIdle = false;
  }

  onImageDeactivated() {
    this.activeImagesCount -= 1;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    this.destroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.container.removeEventListener("mousemove", this.handlePointerMove);
    this.container.removeEventListener("touchmove", this.handlePointerMove);
    this.container.removeEventListener("mousemove", this.initRender);
    this.container.removeEventListener("touchmove", this.initRender);
    this.images.forEach((img) => {
      gsap.killTweensOf(img.el);
      img.destroy();
    });
  }
}

export function ImageTrail({
  items,
  variant = 1,
}: {
  items: readonly string[];
  variant?: 1;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new ImageTrailVariant1(container);
    return () => instance.destroy();
  }, [items, variant]);

  return (
    <div className="image-trail" ref={containerRef}>
      {items.map((url) => (
        <div className="image-trail__img" key={url}>
          <div
            className="image-trail__inner"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
}
