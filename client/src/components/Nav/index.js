import React from 'react';
import { useMutation } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import { ADD_NEWCREATOR, LOGIN_CREATOR} from '../../utils/mutations';
import Auth from '../../utils/auth';

import {
  ContainerOutlined,
  PieChartOutlined,
  PlusOutlined,
  EyeInvisibleOutlined, EyeTwoTone,
  EllipsisOutlined,
  BulbOutlined 
} from '@ant-design/icons';
import { Button, Menu, Typography, Layout, Space, Col,  Drawer, Form, Input, Row, Modal, Divider, Tour} from 'antd';
import { useRef, useState } from 'react';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 94,
  paddingInline: 50,
  padding: 30,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

const { Title } = Typography;


const logout = (event) => {
      event.preventDefault();
      Auth.logout();}

const App = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const [open, setOpen] = useState(false);
const showDrawer = () => {
  setOpen(true);
};
const onClose = () => {
  setOpen(false);
};
const [passwordVisible, setPasswordVisible] = React.useState(false);

//
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_NEWCREATOR);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const SignupSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // Login

  const [formState1, setFormState1] = useState({ email: '', password: '' });
  const [login, { error1, data1 }] = useMutation(LOGIN_CREATOR);

  const LoginSubmit = async (event) => {
    event.preventDefault();
    console.log(formState1);
    try {
      const { data } = await login({
        variables: { ...formState1 },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    
    setFormState1({
      email: '',
      password: '',
    });
  };

  const changeHandler1 = (event) => {
    const { name, value } = event.target;

    setFormState1({
      ...formState1,
      [name]: value,
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

//tour
const ref1 = useRef(null);
const ref2 = useRef(null);
const ref3 = useRef(null);
const [open1, setOpen1] = useState(false);
const steps = [
  {
    title: 'Welcome to Recipe Corner',
    description: 'Recipe Corner is a space where users can share recipes and food creations.',
    cover: (
      <img
        alt="tour.png"
        src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
    ),
    target: () => ref1.current,
  },
  {
    title: 'Creating a new account',
    description: 'To add posts or comments, create a new account by click here and entering your name, email and password',
    placement: 'right',
    target: () => ref2.current,
  },
  {
    title: 'Logging in',
    description: 'To log back in, click here and enter your username and password',
    target: () => ref3.current,
  },
];

const handleClick = async (event) => {
  const itemID = "price_1IUx1FJ2iOysJZvP1LD3EzTR";
  const stripe = await stripePromise;
  stripe
    .redirectToCheckout({
      mode: "payment",
      successUrl: window.location.protocol + "//localpdf.tech/merge",
      cancelUrl: window.location.protocol + "//localpdf.tech/merge",
      submitType: "donate",
    })
    .then(function (result) {
      if (result.error) {
        console.log(result);
      }
    });
  }
  

  return (
    <div>
    <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
    size={[0, 48]}
  >
    <Layout>
    <Header style={headerStyle}> <Title level={2} ref={ref1}>Recipe Corner 🍔</Title></Header>
      <Layout>
        <Sider style={siderStyle}>
        <div> </div>

      {Auth.loggedIn() ? (
            
            <Menu
            onClick={onClick} selectedKeys={[current]} style={{width:500 }} mode="horizontal" items={[
              {
              label:   
            <>
              <Button danger>
                Logged in
              </Button>
              </>
              },
              {
                label:   
                <>
              <Button type="primary" danger onClick={logout}>
                Logout
              </Button>
              </>
              },
              {
                label:   
              <>
                <Button danger onClick={handleClick}>
                Donate
                </Button>
                </>
                },
              ]}></Menu>
          
          ) : (
      <Menu
      onClick={onClick} selectedKeys={[current]} style={{width:500 }} mode="horizontal" items={[{
        label:  <>
        <Button type="primary" onClick={showDrawer} ref={ref2} icon={<PlusOutlined />}>
          New account
        </Button>
        <Drawer
          title="Create a new account"
          width={500}
          onClose={onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80,
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
         <form onSubmit={SignupSubmit}>
                  <input
                    placeholder="Enter username"
                    value={formState.name}
                    onChange={changeHandler}
                    name="username"
                    type="text"
                  />
                  <br></br>
                  <input
                    placeholder="Enter email"
                    value={formState.email}
                    onChange={changeHandler}
                    name="email"
                    type="email"
                  />
                  <br></br>
                  <input
                    placeholder="Enter password"
                    value={formState.password}
                    onChange={changeHandler}
                    name="password"
                    type="password"
                  />
                  <br></br>
                   <button
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
      </Drawer>
      </>
      },
    {
      label:  <>
      <Button type="primary" onClick={showModal} ref={ref3} icon= {<ContainerOutlined />}>
        Login
      </Button>
      <Modal title="Login" open={isModalOpen} onOk={LoginSubmit} onCancel={handleCancel}>
      <form onSubmit={LoginSubmit}>
                <input
                  placeholder="Enter email"
                  name="email"
                  type="email"
                  onChange={changeHandler1}
                  value={formState1.email}
                />
                <br></br>
                <input
                 name="password"
                 type="password"
                 placeholder="Enter password"
                 onChange={changeHandler1}
                value={formState1.password}
                  
                />
              </form>

      </Modal>
    </>
},
{
  label: <>
    <Button type="primary" onClick={() => setOpen1(true)} icon={<BulbOutlined />}>
        Begin Tour
      </Button>
      <Tour open={open1} onClose={() => setOpen1(false)} steps={steps} />
  </>
}
]}/>
      )}

        </Sider>
    </Layout>
    </Layout>


        <br></br>
  </Space>

   
  </div>

  );
}; 

export default App;