import { useState } from "react"
import { FaRegTrashCan, FaPen } from "react-icons/fa6"
import RForm from "./RForm"

interface Props {
  payload: Requirement
  onDelete: (id: string) => void
  onEdit: (targetRequirement: Requirement) => void
}

const RItem = ({ onDelete, onEdit, payload }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const editHandler = () => setIsEditing((prev) => !prev)

  return (
    <li onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      {isEditing ? (
        <RForm payload={payload} onCancel={editHandler} onDone={onEdit} />
      ) : (
        <div
          className={"border flex flex-col gap-y-1 p-2.5 rounded border-gray-200 transition".concat(
            isHovering ? " border-sky-500" : ""
          )}
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2.5 items-center">
              <p className="text-xl font-[600]">{payload.title}</p>
              <p className="text-xs text-gray-500">{payload.manager}</p>
            </div>

            <p className="text-sm">{payload.status}</p>
          </div>

          <ul className="flex flex-col gap-y-1">
            {payload.descs.map((desc, index) => (
              <li className="flex" key={index}>
                <div className="text-xs bg-gray-50 round ed p-1 text-gray-700 hover:shadow-md flex gap-x-2">
                  {index + 1}. {desc}
                </div>
              </li>
            ))}
          </ul>

          {isHovering && (
            <div className="flex justify-end gap-x-2.5">
              <button className={button.concat(" hover:text-sky-500")} title="수정" onClick={editHandler}>
                <FaPen />
              </button>
              <button className={button.concat(" hover:text-red-500")} onClick={() => onDelete(payload.id)}>
                <FaRegTrashCan />
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

export default RItem

const button =
  "h-8 w-8 rounded flex items-center justify-center bg-gray-50 hover:opacity-80 hover:bg-gray-100 active:opacity-50 text-gray-500 cursor-pointer text-xs"
