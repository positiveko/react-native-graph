import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { history, info } from '../api';
import { Icon } from './Coin';

interface DetailProps {
  navigation: any;
  route: {
    params: {
      symbol: string;
      id: string;
    };
  };
}

const Detail = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}: DetailProps) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Icon
          source={{
            uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
          }}
        />
      ),
    });
  }, []);

  const { isLoading: infoLoading, data: infoData } = useQuery(
    ['coinInfo', id],
    info
  );

  const { isLoading: historyLoading, data: historyData } = useQuery(
    ['coinHistory', id],
    history
  );

  console.log(infoData);

  return <Container />;
};

export default Detail;

const Container = styled.ScrollView``;
