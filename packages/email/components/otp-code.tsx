interface Props {
  otp: string;
}

export const OtpCode = ({ otp }: Props) => {
  return (
    <div className="bg-gray-100 p-4 w-fit mx-auto text-center text-[42px] font-medium tracking-widest">
      {otp}
    </div>
  );
};
