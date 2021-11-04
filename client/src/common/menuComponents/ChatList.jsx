import styled from 'styled-components';

import ViewImg from '../../assets/icons/viewblack.png';
import UserImage from '../../assets/icons/user.png';

const ChatMenuButton = styled.button`
  display: flex;
  align-items: center;
  width: 96%;
  height: 72px;
  padding: 9px;
  background: none;
  border-radius: 18px;
  outline: none;
  border: none;
  margin-top: 2px;
  background: ${props => (props.active ? '#8774e1' : '')};
  @media (max-width: 1202px) {
    width: 96% !important;
  }

  &:hover {
    background: #292929;
  }

  @media (max-width: 908px) {
    width: 80%;
  }
`;

const ProfileAvatarContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileAvatar = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: url(${UserImage});
  background-size: cover;
`;

const ProfileInformation = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  margin-left: 10px;
  width: 100%;
`;

const NameViewAndHourContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffff;
`;

const ViewAndHourContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50px;
`;

const View = styled.div``;

const ViewImage = styled.img`
  height: 13px;
`;

const Hour = styled.span`
  font-size: 0.8rem;
  font-weight: 550;
  color: #6e6c6c;
`;

const Message = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 550;
  color: #6e6c6c;
`;
const ChatList = ({ openChat, data, active }) => {
  return (
    <ChatMenuButton onClick={openChat} active={active}>
      <ProfileAvatarContent>
        <ProfileAvatar />
      </ProfileAvatarContent>

      <ProfileInformation>
        <NameViewAndHourContent>
          <Name>{data?.name}</Name>
          <ViewAndHourContent>
            <View>
              <ViewImage src={ViewImg}></ViewImage>
            </View>
            <Hour>21:00</Hour>
          </ViewAndHourContent>
        </NameViewAndHourContent>
        <Message>Click to enter chat</Message>
      </ProfileInformation>
    </ChatMenuButton>
  );
};
export default ChatList;
