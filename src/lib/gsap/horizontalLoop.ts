import gsap from "gsap";

type HorizontalLoopConfig = {
  speed?: number;
  paused?: boolean;
  repeat?: number;
  reversed?: boolean;
  paddingRight?: number;
  snap?: number | false;
};

/**
 * Boucle horizontale seamless (démo GreenSock / Snellenberg).
 * Aligné sur la version classique avec parseFloat pour x / xPercent.
 */
export function horizontalLoop(
  items: gsap.TweenTarget[],
  config?: HorizontalLoopConfig,
) {
  const list = gsap.utils.toArray(items) as HTMLElement[];
  const cfg = config || {};
  const snap =
    cfg.snap === false ? (v: number) => v : gsap.utils.snap(cfg.snap || 1);

  const tl = gsap.timeline({
    repeat: cfg.repeat,
    paused: cfg.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    },
  });

  const length = list.length;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  let curIndex = 0;
  const pixelsPerSecond = (cfg.speed || 1) * 100;
  const startX = list[0].offsetLeft;

  gsap.set(list, {
    xPercent: (i, el) => {
      const element = el as HTMLElement;
      const w = (widths[i] = parseFloat(
        String(gsap.getProperty(element, "width", "px")),
      ));
      const xPx = parseFloat(String(gsap.getProperty(element, "x", "px"))) || 0;
      const xp =
        parseFloat(String(gsap.getProperty(element, "xPercent"))) || 0;
      xPercents[i] = snap((xPx / w) * 100 + xp);
      return xPercents[i];
    },
  });
  gsap.set(list, { x: 0 });

  const last = list[length - 1];
  const totalWidth =
    last.offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    last.offsetWidth * Number(gsap.getProperty(last, "scaleX")) +
    (parseFloat(String(cfg.paddingRight)) || 0);

  for (let i = 0; i < length; i++) {
    const item = list[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop =
      distanceToStart + widths[i] * Number(gsap.getProperty(item, "scaleX"));

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0,
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond,
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index: number, vars?: gsap.TweenVars) {
    const v = vars || {};
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];
    if ((time > tl.time()) !== (index > curIndex)) {
      v.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    v.overwrite = true;
    return tl.tweenTo(time, v);
  }

  const extended = tl as gsap.core.Timeline & {
    next: (vars?: gsap.TweenVars) => gsap.core.Tween;
    previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
    toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
    current: () => number;
    times: number[];
  };

  extended.next = (vars) => toIndex(curIndex + 1, vars);
  extended.previous = (vars) => toIndex(curIndex - 1, vars);
  extended.current = () => curIndex;
  extended.toIndex = (index, vars) => toIndex(index, vars);
  extended.times = times;

  tl.progress(1, true).progress(0, true);

  if (cfg.reversed) {
    const onRev = tl.vars.onReverseComplete;
    if (typeof onRev === "function") onRev();
    tl.reverse();
  }

  return extended;
}
