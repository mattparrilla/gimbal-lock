// I believe this file can be ignored for the purposes of this question

import { MathUtils } from "three";

// calculate signed distance between two angles (a,b) while accounting for angle wrap
const angleDelta = (a, b, minAngle, maxAngle) => {
  const range = maxAngle - minAngle;
  let delta = a - b;
  if (delta > maxAngle) {
    return (delta -= range);
  } else if (delta < minAngle) {
    return (delta += range);
  }
  return delta;
};

// map from possible beta values (in degrees)  -1 and 1
export const calcBetaOffset = (beta, originBeta) => MathUtils.mapLinear(
  MathUtils.clamp(angleDelta(beta, originBeta, -180, 180), -90, 90),
  -90,
  90,
  -1,
  1
);

// map from possible gamma values (in degrees)  -1 and 1
export const calcGammaOffset = (gamma, originGamma) => MathUtils.mapLinear(
  angleDelta(gamma, originGamma, -180, 180),
  -90,
  90,
  -1,
  1
);
