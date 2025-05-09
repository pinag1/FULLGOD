import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap";
import useBonusHuntSummaries from "../../../hooks/useBonusHuntSummaries"; // ajusta o path se necessário

const BonusHuntTable = ({ bonusHunts, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const summaries = useBonusHuntSummaries(bonusHunts);

  const paginate = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(bonusHunts.length / itemsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const paginatedBonusHunts = paginate(bonusHunts, currentPage, itemsPerPage);

  return (
    <>
      <SimpleHeader name="Tables" parentName="Tables" />
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Bonus Hunts</h3>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Status</th>
                    <th scope="col">Criado Por</th>
                    <th scope="col">Progresso</th>
                    <th scope="col">Início</th>
                    <th scope="col">Total Pay</th>
                    <th scope="col">Lucro</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {paginatedBonusHunts.map((hunt) => {
                    const summary = summaries[hunt.id];

                    return (
                      <tr key={hunt.id}>
                        <th scope="row">{hunt.id}</th>
                        <td>
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={require("assets/img/theme/bootstrap.jpg")}
                              />
                            </a>
                            <Media>
                              <span className="mb-0 text-sm">{hunt.name}</span>
                            </Media>
                          </Media>
                        </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={`bg-${hunt.status === "HUNTING" ? "warning" : "success"}`} />
                            <span className="status">{hunt.status.toLowerCase()}</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id={`tooltip-${hunt.id}`}
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={require("assets/img/theme/team-1.jpg")}
                              />
                            </a>
                            <UncontrolledTooltip delay={0} target={`tooltip-${hunt.id}`}>
                              {summary?.madeBy || "Desconhecido"}
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">
                              {hunt.completion ? `${hunt.completion}%` : "0%"}
                            </span>
                            <div>
                              <Progress
                                max="100"
                                value={hunt.completion || 0}
                                color="info"
                              />
                            </div>
                          </div>
                        </td>
                        <td>{summary?.start != null ? `€${summary.start}` : "-"}</td>
                        <td>{summary?.totalPay != null ? `€${summary.totalPay}` : "-"}</td>
                        <td>{summary?.profit != null ? `€${summary.profit}` : "-"}</td>
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
                              <DropdownItem onClick={() => onEdit(hunt)}>
                                Editar
                              </DropdownItem>
                              <DropdownItem onClick={() => onDelete(hunt)}>
                                Excluir
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <div className="d-flex justify-content-center">
                <Pagination>
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage - 1)}
                      previous
                      href="#pablo"
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index} active={currentPage === index + 1}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                        href="#pablo"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage + 1)}
                      next
                      href="#pablo"
                    />
                  </PaginationItem>
                </Pagination>
              </div>
            </Card>
    </>
  );
};

export default BonusHuntTable;
