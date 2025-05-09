import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useState } from "react";

import {
  Card,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  UncontrolledDropdown,
} from "reactstrap";

const BonusBuyBattleTable = ({ battles, onView, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginate = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(battles.length / itemsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const paginatedBattles = paginate(battles, currentPage, itemsPerPage);

  return (
    <>
      <SimpleHeader name="Tables" parentName="Tables" />
      <Card className="bg-default shadow">
        <CardHeader className="bg-transparent border-0">
          <h3 className="text-white mb-0">Bonus Buy Battles</h3>
        </CardHeader>
        <Table className="align-items-center table-dark table-flush" responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Jogadores</th>
              <th scope="col">Slots</th>
              <th scope="col">Bonus Value</th>
              <th scope="col">Score</th>
              <th scope="col">Vencedor</th>
              <th scope="col">Criado</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBattles.map((battle) => (
              <tr key={battle.id}>
                <th scope="row">{battle.id}</th>
                <td>{battle.name}</td>
                <td>
                  {battle.player1?.name || battle.player1?.email} vs{" "}
                  {battle.player2?.name || battle.player2?.email}
                </td>
                <td>
                  {battle.slot1?.name} vs {battle.slot2?.name}
                </td>
                <td>
                  {battle.slot1BonusValue ?? "-"}€ vs{" "}
                  {battle.slot2BonusValue ?? "-"}€
                </td>
                <td>
                  {battle.player1Score?.toFixed(2) ?? "—"}x vs{" "}
                  {battle.player2Score?.toFixed(2) ?? "—"}x
                </td>
                <td>{battle.winner?.name || battle.winner?.email || "—"}</td>
                <td>{new Date(battle.createdAt).toLocaleString()}</td>
                <td className="text-right">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      role="button"
                      size="sm"
                      color=""
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem onClick={() => onView(battle)}>
                        Ver / Editar
                      </DropdownItem>
                      <DropdownItem onClick={() => onDelete(battle)}>
                        🗑️ Apagar
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-center">
          <Pagination>
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink
                onClick={() => handlePageChange(currentPage - 1)}
                previous
                href="#p"
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index} active={currentPage === index + 1}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  href="#p"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink
                onClick={() => handlePageChange(currentPage + 1)}
                next
                href="#p"
              />
            </PaginationItem>
          </Pagination>
        </div>
      </Card>
    </>
  );
};

export default BonusBuyBattleTable;
