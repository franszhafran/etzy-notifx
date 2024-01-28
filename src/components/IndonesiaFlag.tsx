type IndonesiaFlagProps = {
  width: number;
  height: number;
};

export default function IndonesiaFlag(props: IndonesiaFlagProps) {
  return (
    <div
      style={{ width: props.width, height: props.height }}
      className='inline-block'
    >
      <div className='w-full h-1/2 bg-red-600'></div>
      <div className='w-full h-1/2 bg-white'></div>
    </div>
  );
}
