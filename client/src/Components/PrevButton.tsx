type PrevButtonProps = {
  onClick: () => void;
};

export function PrevButton({ onClick }: PrevButtonProps) {
  return <button onClick={onClick}>Prev</button>;
}

export default PrevButton;
