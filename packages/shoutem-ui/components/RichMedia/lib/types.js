/**
 * @flow
 */
export type AttribsType = {
  type: string,
  id: string,
  src: string;
  width: string;
  height: string;
}

export type NodeType = {
  name: string,
  attribs: AttribsType,
  children?: Array<NodeType>,
  type: string,
  data: string,
}
