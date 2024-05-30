import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  isLoading?: boolean;
  link?: string;
  width?:number
  isDisabled?:boolean
  click?: () => void
};

export const ButtonCustom = ({ title, isLoading, link,width,click,isDisabled }: Props): React.ReactElement | null => {
  return (
    <>
      {link ? (
        <Link className='h-full' to={link}>
          <Button w={width} loading={isLoading}>{title}</Button>
        </Link>
      ) : (
        <Button disabled={isDisabled} onClick={click} w={width} loading={isLoading}>{title}</Button>
      )}
    </>
  );
};
