import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import styled from 'styled-components/native';

interface CoinProps {
  symbol: string;
  index: number;
}

const Coin = ({ symbol, index }: CoinProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1, //  0 -> 1로 변경
      useNativeDriver: true,
      delay: index * 100, // idx에 따라 지연 시간 설정
    }).start();
  }, []);

  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <Wrapper style={{ flex: 0.31, opacity, transform: [{ scale }] }}>
      <Icon
        source={{
          uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
        }}
      />
      <CoinName>{symbol}</CoinName>
    </Wrapper>
  );
};

export default React.memo(Coin);

// View에 애니메이션을 넣을 때
const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 5px;
  align-items: center;
`;

const CoinName = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const Icon = styled.Image`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;
