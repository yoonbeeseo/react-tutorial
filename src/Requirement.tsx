import { Link } from "react-router-dom";
import { Alert, Item } from "./store";

const Requirement = () => {
  const { items, remove, setPayload } = Item.use();
  const { alert } = Alert.use();
  return (
    <div>
      요구사항 명세 내용 출력
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <Link to={item.id} onClick={() => setPayload(item)}>
              {index + 1}. {item.title} {item.status} {item.manager}
              <button
                onClick={() => {
                  remove(item.id);
                  alert("삭제되었습니다.");
                }}
              >
                삭제
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requirement;
