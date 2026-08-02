export type XPositions = "left" | "right" | "center";
export type YPositions = "top" | "bottom" | "center";

export type PositionString = `${YPositions} ${XPositions}`;
export type PositionStringExclude<E extends PositionString> = Exclude<
  PositionString,
  E
>;
export type PositionStringEdge = PositionStringExclude<"center center">;
