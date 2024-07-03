type DotsProps = {
  count: number;
  currentIndex: number;
  onClick: (index: number) => void;
};

export function Dots({ count, currentIndex, onClick }: DotsProps) {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          style={{
            cursor: 'pointer',
            padding: '0 5px',
            color: currentIndex === index ? 'black' : 'gray',
          }}
          onClick={() => onClick(index)}>
          •
        </span>
      ))}
    </div>
  );
}

export default Dots;
