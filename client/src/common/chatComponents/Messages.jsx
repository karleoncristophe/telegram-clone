import styled from 'styled-components';
import dayjs from 'dayjs';
import { Menu, Dropdown } from 'antd';
import UserImage from '../../assets/icons/user.png';
import { RestOutlined } from '@ant-design/icons';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  margin-top: 4px;
`;

const RevertContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const MessageContainer = styled.main`
  display: flex;
  justify-content: center;
  position: relative;
  right: 17px;

  margin-top: 2px;
  border-radius: 12px 12px 12px 0px;
  max-height: 2196px;
  min-height: 33px;
  min-width: 56px;
  max-width: 480px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px;
`;

const MessageText = styled.span`
  word-break: break-word;
  line-height: 21px;
  margin: 5px 35px 5px 5px;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: -3px;
  text-align: left;
  font-size: 1rem;
  color: #ffffff;
`;

const NickName = styled.span`
  font-size: 1rem;
  margin: 5px;
  max-width: 150px;
  color: #e0510f;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DataAndNameContent = styled.div`
  display: flex;
  align-items: center;
  padding-right: 5px;
`;

const Data = styled.span`
  display: flex;
  font-size: 0.8rem;
  min-width: 40px;
  max-width: 100px;
  color: #eb2727;
  line-height: 20px;
  word-wrap: break-word;
  margin-left: 3px;
  padding-right: 5px;
`;

const Hours = styled.span`
  margin-right: 5px;
  font-size: 0.8rem;
  text-align: right;
  height: 15px;
  margin-top: -15px;
  color: #ffffff;
  margin-bottom: 5px;
`;

const Coner = styled.div`
  position: relative;
  border-left: 10px solid transparent;
  border-right: 16px solid transparent;
`;

const ProfileContent = styled.div`
  display: flex;
`;

const ProfileAvatarButton = styled.button`
  margin-left: 5px;
  display: flex;
  border: none;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-size: cover;
  background-image: url(${UserImage});
`;

const MessageAndHoursContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeleteMessageContent = styled(Menu)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: none;
  border: none;
  width: 100%;
  height: 55px;
  background: #212121;
`;

const DeleteMessageButton = styled(Menu.Item)`
  display: flex;
  width: 100%;
  background: none;
  color: #ec5b5b;
  font-weight: 550;
  font-size: 1rem;
  height: 45px;
  border: none;

  &:hover {
    background: #383737;
    transition: 1s;
  }
`;

const Messages = ({ data, openSearch, user, openProfile, remove }) => {
  const isDay = dayjs(data.createdAt).isBefore(
    dayjs(dayjs().format('YYYY-MM-DD'))
  );

  const deleteMessage = (
    <DeleteMessageContent>
      <DeleteMessageButton
        onClick={remove}
        icon={<RestOutlined style={{ fontSize: '18px' }} />}
      >
        Delete Message
      </DeleteMessageButton>
    </DeleteMessageContent>
  );

  return (
    <Container
      style={{
        justifyContent: data.user === user ? 'flex-end' : 'flex-start',
        transform: data.user === user ? 'scaleX(1)' : null,
      }}
    >
      <RevertContainer
        style={{
          transform: data.user === user ? 'scaleX(-1)' : null,
        }}
      >
        <ProfileContent>
          {data.user === user ? null : (
            <ProfileAvatarButton
              onClick={openProfile}
              disabled={openSearch === true}
            />
          )}
          <Coner
            style={{
              borderBottom:
                data.user === user
                  ? ' 15px solid  #8570f3'
                  : ' 15px solid  #212121',
            }}
          />
        </ProfileContent>
        <Dropdown overlay={deleteMessage} trigger={['click']}>
          <MessageContainer
            style={{
              background: data.user === user ? '#8774E1' : ' #212121',
            }}
          >
            <MessageContent
              style={{
                transform: data.user === user ? 'scaleX(-1)' : null,
              }}
            >
              <DataAndNameContent>
                {user?.name === user ? null : <NickName>{data.user}</NickName>}

                {isDay
                  ? dayjs(data.createdAt).format('DD/MM/') && (
                      <>
                        {data.user === user ? null : (
                          <Data>
                            Date{' '}
                            {isDay
                              ? dayjs(data.createdAt).format('DD/MM')
                              : null}
                          </Data>
                        )}
                      </>
                    )
                  : null}
              </DataAndNameContent>
              <MessageAndHoursContent>
                <MessageText>{data.message}</MessageText>
                <Hours>{dayjs(data.createdAt).format('HH:mm')}</Hours>
              </MessageAndHoursContent>
            </MessageContent>
          </MessageContainer>
        </Dropdown>
      </RevertContainer>
    </Container>
  );
};

export default Messages;
