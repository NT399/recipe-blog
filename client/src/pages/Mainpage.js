import React from 'react';
import { useQuery } from '@apollo/client';
import FoodFeed from '../components/FoodFeed';
import PostPopupInput from '../components/PostPopupInput';
import { QUERY_CREATIONS } from '../utils/queries';
import { Layout, Space } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '15px',
  color: '#fff',
  backgroundColor: 'navy',
};

const Main = () => {
  const { data } = useQuery(QUERY_CREATIONS);
  const creations = data?.creations || [];

  return (
    <div>
           <Layout>
           <Content style={contentStyle}>
      <div >
        <div>
          <PostPopupInput />
        </div>
        <div >
        <FoodFeed creations={creations}/>
        </div>
      </div>
      </Content>
      </Layout>
    </div>
  );
};

export default Main;
