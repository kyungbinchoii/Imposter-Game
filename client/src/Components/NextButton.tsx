type NextButtonProps = {
  onClick: () => void;
};

export function NextButton({ onClick }: NextButtonProps) {
  return <button onClick={onClick}>Next</button>;
}

export default NextButton;
