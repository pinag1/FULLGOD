import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    UncontrolledDropdown,
} from "reactstrap";

const TournamentTable = ({ tournaments, onView, onDelete }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      tournaments.filter((t) => t.name.toLowerCase().includes(lower))
    );
    setCurrentPage(1);
  }, [search, tournaments]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginate = (items, page) => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };
  const paginated = paginate(filtered, currentPage);

  return (
    <>
      <SimpleHeader name="Torneios" parentName="Tabelas" />
      <Card className="bg-default shadow">
        <CardHeader className="bg-transparent border-0">
          <h3 className="text-white mb-0">Torneios</h3>
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
            onClick={() => navigate("/admin/tournaments/new")}
          >
            + New Tournament
          </Button>
        </div>

        <Table className="align-items-center table-dark table-flush" responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col"># Participantes</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t._count?.participants ?? 0}</td>
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
                      <DropdownItem onClick={() => onView(t)}>
                        Ver
                      </DropdownItem>
                      <DropdownItem onClick={() => onDelete(t)}>
                        Apagar
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
                <PaginationLink
                  href="#p"
                  onClick={() => setCurrentPage(i + 1)}
                >
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
      </Card>
    </>
  );
};

export default TournamentTable;
