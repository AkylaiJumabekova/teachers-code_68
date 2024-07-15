import { Button, Flex, Spin, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import {
  decreaseBy,
  decreaseCounter,
  fetchCounter,
  increaseBy,
  increaseCounter,
} from './counterSlice';

export const Counter = () => {
  const counterValue = useSelector((state: RootState) => state.counter.value);
  const isLoading = useSelector((state: RootState) => state.counter.isLoading);
  const isError = useSelector((state: RootState) => state.counter.isError);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCounter());
  }, [dispatch]);

  const increment = async () => {
    await dispatch(increaseCounter());
    await dispatch(fetchCounter());
  };

  const decrement = async () => {
    await dispatch(decreaseCounter());
    await dispatch(fetchCounter());
  };

  return (
    <Flex
      vertical
      justify={'center'}
      gap={'small'}
      align={'center'}
      style={{ height: '100vh' }}
    >
      <Typography.Title level={3} style={{ fontWeight: 400 }}>
        Count: {isLoading ? <Spin /> : counterValue}
      </Typography.Title>

      {isError && <Typography.Text type={'danger'}>Error</Typography.Text>}

      <Flex
        wrap={'wrap'}
        justify={'center'}
        align={'center'}
        gap={'middle'}
        style={{ maxWidth: 250 }}
      >
        <Button
          type={'primary'}
          size={'large'}
          disabled={isLoading}
          onClick={() => dispatch(increment)}
        >
          Increase
        </Button>
        <Button
          type={'primary'}
          size={'large'}
          disabled={isLoading}
          onClick={() => dispatch(decrement)}
        >
          Decrease
        </Button>
        <Button
          type={'primary'}
          size={'large'}
          disabled={isLoading}
          onClick={() => dispatch(increaseBy(5))}
        >
          Increase by 5
        </Button>
        <Button
          type={'primary'}
          size={'large'}
          disabled={isLoading}
          onClick={() => dispatch(decreaseBy(5))}
        >
          Decrease by 5
        </Button>
      </Flex>
    </Flex>
  );
};
