import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

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

const SlotTable = ({ slots, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const totalPages = Math.ceil(slots.length / itemsPerPage);
  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      slots.filter((slot) => slot.name.toLowerCase().includes(lower))
    );
  }, [search, slots]);
  const paginate = (items, page) => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const paginated = paginate(slots, currentPage);

  return (
    <>
      <SimpleHeader name="Tables" parentName="Tables" />
      <Card className="bg-default shadow">
        <CardHeader className="bg-transparent border-0">
          <h3 className="text-white mb-0">Slots</h3>
        </CardHeader>
        <InputGroup className="mb-3 w-50">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>🔍</InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Pesquisar por nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button
            color="primary"
            onClick={() => navigate("/admin/slot-admin/create")}
          >
            + New Slot
          </Button>
        </div>
        <Table className="align-items-center table-dark table-flush" responsive>
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Provider</th>
              <th>RTP</th>
              <th>Potencial</th>
              <th>Volatility</th>
              <th>Best Win</th>
              <th>Best X</th>
              <th>Avg X</th>
              <th>Quantidade Bonus</th>
              <th>Release Date</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((slot) => (
              <tr key={slot.id}>
                <td>{slot.id}</td>
                <td>{slot.name}</td>
                <td>{slot.provider}</td>
                <td>{slot.rtp}</td>
                <td>{slot.potencial}</td>
                <td>{slot.volatility}</td>
                <td>{slot.bestwin}</td>
                <td>{slot.bestX}</td>
                <td>{slot.avgX}</td>
                <td>{slot.quantidadeBonus}</td>
                <td>{new Date(slot.releaseDate).toLocaleDateString()}</td>
                <td className="text-right">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      size="sm"
                      color=""
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => onEdit(slot)}>
                        ✏️ Editar
                      </DropdownItem>
                      <DropdownItem onClick={() => onDelete(slot)}>
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
                previous
                href="#p"
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i} active={currentPage === i + 1}>
                <PaginationLink href="#p" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink
                next
                href="#p"
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </PaginationItem>
          </Pagination>
        </div>
      </Card>{" "}
    </>
  );
};

export default SlotTable;
