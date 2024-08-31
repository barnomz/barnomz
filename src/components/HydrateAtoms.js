import { useHydrateAtoms } from "jotai/utils";

const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues);
  return children;
};

export default HydrateAtoms;
