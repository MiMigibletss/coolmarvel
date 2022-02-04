import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Input } from "antd";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

function Port1() {
  const [blockData, setBlockData] = useState("");
  const [peer, setPeer] = useState("");
  const [peers, setPeers] = useState(" ");
  const [Wallet, setWallet] = useState([]);
  const [Money, setMoney] = useState(0);
  const [MoneyToAddress, setMoneyToAddress] = useState("");
  const [Balance, setBalance] = useState([]);
  const [chainBlocks, setChainBlocks] = useState([]);
  const reverse = [...chainBlocks].reverse();
  const [shownBlock, setshownBlock] = useState({});
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const [ok, setOk] = useState(false);
  const [transactionPool, setTransactionPool] = useState("");

  // 트랜잭션이 생기면 화면에 계속 갱신시킬것
  useEffect(() => {
    getTransactionPool();
  }, [transactionPool]);

  useInterval(
    () => {
      const data = blockData || "화이팅";
      setIsRunning(false);
      axios
        .post(`http://localhost:3001/mineBlock`, { data: [data] })
        .then((req) => {
          console.log(req.data);
          setIsRunning(true);
        });

      setCount(count + 1);
    },
    isRunning && ok ? delay : null
  );

  const bcMaker = async () => {
    const data = blockData;
    if (data.length === 0) {
      return alert(`데이터를 넣어주세용`);
    }
    await axios
      .post(`http://localhost:3001/mineBlock`, { data: [data] })
      .then((req) => alert(req.data));
  };

  const getBlockchain = async () => {
    await axios
      .get(`http://localhost:3001/blocks`)
      .then((res) => setChainBlocks(res.data));
  };

  // 지갑 공개키 받아오기
  const getAddress = async () => {
    await axios
      .get(`http://localhost:3001/address`)
      .then((res) => setWallet(res.data.address));
  };

  // 지갑 잔액 조회
  const getBalance = async () => {
    await axios
      .get(`http://localhost:3001/balance`)
      .then((res) => setBalance(res.data.balance));
  };

  // 트랜잭션 만들기
  const sendTransaction = async () => {
    if (Money <= 0) {
      alert("금액이 올바르지 않습니다.");
    } else if (MoneyToAddress.length !== 130) {
      alert("주소가 올바르지 않습니다.");
    } else {
      await axios
        .post(`http://localhost:3001/sendTransaction`, {
          address: MoneyToAddress,
          amount: Money,
        })
        .then((res) => {
          console.log(res.data);
          alert("트랜잭션이 생성되었읍니다");
        });
    }
  };

  // 트랜잭션풀 불러오기
  const getTransactionPool = async () => {
    await axios
      .get(`http://localhost:3001/transactionPool`)
      .then((res) => setTransactionPool(res.data));
  };

  // 서버 멈춰
  const stop = async () => {
    await axios
      .post(`http://localhost:3001/stop`)
      .then((res) => alert(res.data));
  };

  // 연결된 소켓들 불러오기
  const getpeers = async () => {
    axios.get(`http://localhost:3001/peers`).then((res) => setPeers(res.data));
  };
  if (peers.length === 0) {
    return setPeers(`연결된 피어가 없습니다.`);
  }

  const addPeer = async () => {
    const P = peer;
    if (P.length === 0) {
      return alert(`Peer Port를 입력해주세요.`);
    }
    await axios
      .post(`http://localhost:3001/addPeer`, {
        peer: [`ws://localhost:${P}`],
      })
      .then((res) => alert(res.data));
  };

  const toggleComment = (blockchain) => {
    console.log([blockchain.header.index]);
    setshownBlock((prevShownComments) => ({
      ...prevShownComments,
      [blockchain.header.index]: !prevShownComments[blockchain.header.index],
    }));
  };

  function handleWriteAddress(e) {
    setWriteAddress(e.target.value);
  }

  function handleSendAmount(e) {
    setSendAmount(e.target.value);
  }

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  return (
    <div style={{ background: 'white' }}>
      <br />
      <Button color="error" style={{ marginTop: 5 }} variant="contained" type="dash" onClick={getAddress}>
        지갑(publicKey)
      </Button>
      <Button color="error" style={{ marginTop: 5 }} variant="contained" type="dash" onClick={getBalance}>
        코인(Balance)
      </Button>

      <div className="wallet_bublic_key_div">
        <div className="wallet_bublic_key_div-title"></div>
        <div className="wallet_bublic_key_div-content">{Wallet}</div>
      </div>
      <div className="wallet_bublic_key_div">
        <div className="wallet_bublic_key_div-title"></div>
        <div className="wallet_bublic_key_div-content">{Balance}</div>
      </div>
      <br />
      <br />
      <Input
        placeholder="연결할 노드 번호를 적으세요"
        onChange={(e) => {
          setPeer(e.target.value);
        }}
        value={peer}
      />
      <ButtonGroup disableElevation color="error" variant="contained" size="medium">
        <Button style={{ marginTop: 5 }} type="dash" onClick={addPeer}>
          피어 연결
        </Button>
        <Button style={{ marginTop: 5 }} color="warning" variant="outlined" type="dash" onClick={getpeers}>
          피어 연결목록 확인
        </Button>
      </ButtonGroup>
      <p>
        {" "}
        <b style={{ marginLeft: 10 }}></b> {peers}
      </p>
      <br />
      <Input
        placeholder="보낼 지갑 주소를 적으세요"
        type="text"
        onChange={(e) => {
          setMoneyToAddress(e.target.value);
        }}
        value={MoneyToAddress}
      />
      <Input
        placeholder="보낼 코인의 양을 적으세요"
        type="number"
        onChange={(e) => {
          setMoney(e.target.value);
        }}
        value={Money}
      />
      <Button color="error" style={{ marginTop: 5 }} variant="contained" type="dash" onClick={sendTransaction}>
        보내기
      </Button>
      <br />
      <br />
      <br />
      <Input
        placeholder="body에 들어갈 data를 입력하시오"
        type="text"
        onChange={(e) => {
          setBlockData(e.target.value);
        }}
        value={blockData}
      />
      <ButtonGroup disableElevation color="error" variant="contained" size="medium">
        <Button
          variant="contained"
          size="large"
          style={{ marginTop: 5, marginBottom: 10 }}
          type=""
          onClick={bcMaker}
        >
          블록 채굴
        </Button>
        <Button variant="outlined" color="warning" size="large" style={{ marginTop: 5, marginBottom: 10 }} type="dash" onClick={getBlockchain}>
          블록체인 보기
        </Button>
      </ButtonGroup>
      {reverse.map((a) => {
        return (
          <ul key={a.header.index}>
            <div
              onClick={() => {
                toggleComment(a);
              }}
            >
            </div>
            <Col span={23}>
              <Row justify="end">
                <Col span={23}>
                  <Card
                    size="small"
                    className="block_box-block_info"
                  >
                    <li>
                      <div>
                        <strong>고유 번호</strong>
                      </div>
                      <div>{a.header.index}  ({a.header.index + 1}번째 블록)</div>
                    </li>
                    <hr className="boundary_line"></hr>
                    <li>
                      <div>
                        <strong>해시값</strong>
                      </div>
                      <div>{JSON.stringify(a.header.hash)}</div>
                    </li>
                    <hr className="boundary_line"></hr>
                    <li>
                      <div>
                        <strong>이전 해시값</strong>
                      </div>
                      <div>{a.header.previousHash}</div>
                    </li>
                    <hr className="boundary_line"></hr>
                    <li>
                      <div>
                        <strong>블록 생성 시각</strong>
                      </div>
                      <div>{a.header.timestamp}</div>
                    </li>
                    <hr className="boundary_line"></hr>
                    <li>
                      <div>
                        <strong>머클루트</strong>
                      </div>
                      <div>{a.header.merkleRoot}</div>
                    </li>
                    <hr className="boundary_line"></hr>
                    <li>
                      <div>
                        <strong>난이도</strong>
                      </div>
                      <div>{a.header.difficulty}</div>
                    </li>
                    <hr className="boundary_line"></hr>
                    <li>
                      <div>
                        <strong>넌스</strong>
                      </div>
                      <div>{JSON.stringify(a.header.nonce)}</div>
                    </li>
                    <hr className="boundary_line"></hr>
                    <li>
                      <div>
                        <strong>담긴 데이터</strong>
                      </div>
                      <div>{a.body}</div>
                    </li>
                  </Card>
                </Col>
              </Row>
            </Col>
          </ul>
        );
      })}
    </div>
  );
}
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Port1;