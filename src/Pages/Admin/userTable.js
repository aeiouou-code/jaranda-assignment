import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageButton from 'Components/pageButton';
import UserModal from './userModal';
import { ROLE } from 'asset/role';
import { cardNumberFormat } from 'utils/format';

const Td = styled.td`
  padding-right: 18px;
  padding-top: 20px;
`;
const Table = styled.table``;
const THead = styled.thead`
  margin: 8px 0px;
`;
const TBody = styled.tbody``;

const User = ({ user, onClickhandler }) => {
  const { id, userName, address, cardNumber, role, isAdmin } = user;
  return (
    <tr onClick={onClickhandler}>
      <Td>{id}</Td>
      <Td>{userName}</Td>
      <Td>{address}</Td>
      <Td>{cardNumberFormat(cardNumber)}</Td>
      <Td>{ROLE[role]}</Td>
      <Td>{isAdmin ? '관리자' : ''}</Td>
    </tr>
  );
};

const UserTable = ({ users }) => {
  const [isModal, setIsModal] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [limit] = useState(3);
  const [showUsers, setShowUsers] = useState([]);
  const openModal = idx => {
    setIsModal(true);
    setModalId(idx);
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    setShowUsers(users.slice(0, limit));
  }, []);

  return (
    <>
      <Table>
        <THead>
          <tr>
            <Td>USERID</Td>
            <Td>이름</Td>
            <Td>주소</Td>
            <Td>카드번호</Td>
            <Td>Role</Td>
            <Td>admin</Td>
          </tr>
        </THead>
        <TBody>
          {showUsers.map((user, idx) => (
            <User key={idx} user={user} onClickhandler={() => openModal(idx)} />
          ))}
        </TBody>
      </Table>
      <PageButton
        items={users}
        setItems={setShowUsers}
        limit={limit}
        size={5}
      />
      <UserModal
        user={users[modalId]}
        show={isModal}
        toggleModal={toggleModal}
      ></UserModal>
    </>
  );
};

export default UserTable;
