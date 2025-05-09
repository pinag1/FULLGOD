// src/views/pages/TournamentBracket.js
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
  Spinner,
} from 'reactstrap';
import useTournamentMatchLogic from '../../../hooks/useTournamentMatchLogic';

export default function TournamentBracket() {
  const { id } = useParams();
  const tournamentId = Number(id);
  const {
    matches, payments, bonus, completed, loading,
    handleBonusChange, handlePaymentChange,
    finalizeMatch, editMatch,
  } = useTournamentMatchLogic(tournamentId);

  if (loading) return <Spinner />;

  // Agrupa por round
  const rounds = {};
  matches.forEach(m => {
    rounds[m.roundNumber] = rounds[m.roundNumber] || [];
    rounds[m.roundNumber].push(m);
  });

  const cols = [
    { title: 'Quartos', key: 'QUARTOS' },
    { title: 'Semis', key: 'SEMIS' },
    { title: 'Final', key: 'FINAL' },
  ];

  return (
    <div>
      <h3 className="mb-4">Torneio {tournamentId} — Bracket</h3>
      <Row>
        {cols.map(({ title, key }) => (
          <Col key={key} md>
            <Card className="mb-4">
              <CardHeader>{title}</CardHeader>
              <CardBody>
                {(rounds[key]||[]).map(m => (
                  <Row key={m.id} className="align-items-start mb-4">
                    {['slot1','slot2'].map((slotKey,idx)=> {
                      const player = idx===0? m.player1 : m.player2;
                      const slot = m[slotKey];
                      const bonusKey = idx===0?'b1':'b2';
                      const bonusVal = bonus[m.id]?.[bonusKey] ?? '';
                      const slotPays = payments[m.id]?.[slotKey]||[];

                      return (
                        <Col key={slotKey} className="mb-3">
                          <Card>
                            <CardBody>
                              <div className="mb-1 font-weight-bold">
                                {player?.name ?? '—'} 
                              </div>
                              <div className="mb-1 font-weight-bold">
                                {slot?.name ?? '—'}
                              </div>
                              <Input
                                type="number"
                                placeholder="bonus value"
                                value={bonusVal}
                                onChange={e=>handleBonusChange(m.id,bonusKey,e.target.value)}
                                disabled={completed[m.id]}   // <— desabilitado quando finalizado
                                className="mb-2 border-primary"
                              />

                              {  ['QUARTOS','SEMIS', 'FINAL'].includes(key) &&
                                [0,1,2].map(i=>{
                                  const show = i===0
                                    ? Boolean(bonusVal)
                                    : slotPays[i-1]?.payment!=null;
                                  if (!show) return null;
                                  return (
                                    <Input
                                      key={i}
                                      type="number"
                                      placeholder={`Pmt ${i+1}`}
                                      value={slotPays[i]?.payment??''}
                                      onChange={e=>
                                        handlePaymentChange(
                                          m.id,
                                          slotKey,
                                          i,
                                          { payment: e.target.value===''?null:Number(e.target.value) }
                                        )
                                      }
                                      disabled={completed[m.id]} // <— idem
                                      className="mb-1"
                                    />
                                  );
                                })
                              }

                              <div className="mt-2">
                                Score:&nbsp;
                                {(
                                  (idx===0?m.player1Score:m.player2Score)||0
                                ).toFixed(6)}
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      );
                    })}

                    <Col xs={12} className="d-flex justify-content-center mt-2">
                      { completed[m.id]
                        ? (
                          <Button color="secondary" onClick={()=>editMatch(m.id)}>
                            Editar
                          </Button>
                        ) : (
                          <Button color="success" onClick={()=>finalizeMatch(m.id)}>
                            Finalizar
                          </Button>
                        )
                      }
                    </Col>
                  </Row>
                ))}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}