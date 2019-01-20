import React from 'react';
import { Button } from 'reactstrap';

const TableComponent = (props) => {
  const {
    players,
    handleDelete,
    handleEdit,
  } = props;

  const tableRows = players.map((player) => {
    return (
      <tr key={player.name}>
        <td>{player.name}</td>
        <td>{player.score}</td>
        <td className="text-right">
          <Button 
          	onClick={() => {
                handleEdit(player.name);
          	}}
          	color="link"
          	className="edit mr-3">
            <i className="fa fa-edit text-primary"></i>
          </Button>
          <Button 
          	onClick={() => {
                handleDelete(player.name);
          	}} 
            color="link" 
            className="delete mr-3">
            <i className="fa fa-trash text-danger"></i>
          </Button>
        </td>
      </tr>
    );
  });

  return tableRows;
}

export default TableComponent;
