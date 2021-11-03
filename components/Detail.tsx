import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { VictoryChart, VictoryLine, VictoryScatter } from 'victory-native';
import { Ionicons } from '@expo/vector-icons';
import { history, info } from '../api';
import { BLACK_COLOR } from '../colors';
import { InNavScreenProp } from '../navigators/InNav';
import { CoinInfo, PriceItem } from '../types';
import { Icon } from './Coin';

interface DetailProps {
  navigation: InNavScreenProp;
  route: {
    params: {
      symbol: string;
      id: string;
      name: string;
    };
  };
}

const Detail = ({
  navigation,
  route: {
    params: { symbol, id, name },
  },
}: DetailProps) => {
  const [victoryData, setVictoryData] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <>
          <Icon
            source={{
              uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
            }}
          />
          <Text>{name}</Text>
        </>
      ),
    });
  }, []);

  const { isLoading: isInfoLoading, data: infoData } = useQuery(
    ['coinInfo', id],
    info
  );

  const { isLoading: isHistoryLoading, data: historyData } = useQuery(
    ['coinHistory', id],
    history
  );

  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map((price: PriceItem) => ({
          x: new Date(price.timestamp).getTime(),
          y: price.price,
        }))
      );
    }
  }, [historyData]);

  const openLink = async (url: string) => {
    await Linking.openURL(url);
  };

  const LinkButton = (idx: string, url: string) => (
    <TouchableOpacity onPress={() => openLink(url)}>
      <Ionicons
        name={idx === 'website' ? 'link-outline' : 'logo-github'}
        color='white'
        size={25}
      />
    </TouchableOpacity>
  );

  if (isInfoLoading || isHistoryLoading) {
    return (
      <Loader>
        <ActivityIndicator color='white' size='large' />
      </Loader>
    );
  }

  const { started_at, rank, description, last_data_at, links } =
    infoData as CoinInfo;

  return (
    <Container>
      {victoryData ? (
        <VictoryChart height={360}>
          <VictoryLine
            animate
            interpolation='monotoneX'
            data={victoryData}
            style={{ data: { stroke: '#1abc9c' } }}
          />
          <VictoryScatter
            data={victoryData}
            style={{ data: { fill: '#1abc9c' } }}
          />
        </VictoryChart>
      ) : null}
      {!infoData ? null : (
        <DetailView>
          {description ? (
            <ItemView>
              <Description>{description}</Description>
            </ItemView>
          ) : null}
          <ItemView>
            <Title>Started At: </Title>
            <Content>
              {new Date(started_at).toLocaleDateString('ko', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Content>
          </ItemView>
          <ItemView>
            <Title>Rank: </Title>
            <Content>{rank}위</Content>
          </ItemView>
          {links?.source_code ? (
            <>
              <ItemView>
                <Title>Website: </Title>
                <Content>{LinkButton('website', links?.website[0])}</Content>
              </ItemView>
              <ItemView>
                <Title>Source Code: </Title>
                <Content>
                  {LinkButton('sourceCode', links?.source_code[0])}
                </Content>
              </ItemView>
            </>
          ) : null}
          <ItemView>
            <Title>Last Updated At: </Title>
            <Content>
              {new Date(last_data_at).toLocaleDateString('ko', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Content>
          </ItemView>
        </DetailView>
      )}
    </Container>
  );
};

export default Detail;

const Container = styled.ScrollView`
  background-color: ${BLACK_COLOR};
`;

const Loader = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  margin-left: 10px;
  color: white;
  font-weight: 600;
  font-size: 20px;
`;

const DetailView = styled.Text`
  flex-direction: column;
  margin: 20px 20px 50px 20px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 18px;
`;

const Content = styled.Text`
  color: white;
  font-size: 18px;
`;

const ItemView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px 0 20px;
`;

const Description = styled.Text`
  color: white;
  font-size: 18px;
`;
