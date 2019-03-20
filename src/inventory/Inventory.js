import React from "react";
import { Divider, Button, Tag } from "antd";
import EdiTable from "../utils/EdiTable";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

class Inventory extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [
        {
          key: "1",
          name: "Bota",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"]
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["loser"]
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"]
        }
      ],
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: text => <a href="javascript:;">{text}</a>
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age"
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address"
        },
        {
          title: "Tags",
          key: "tags",
          dataIndex: "tags",
          render: tags => (
            <span>
              {tags.map(tag => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          )
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <span>
              <div className="icons-list">
                <Button
                  type="primary"
                  shape="circle"
                  icon="edit"
                  ghost
                  onClick
                />
                <Divider type="vertical" />
                <Button type="danger" shape="circle" icon="delete" ghost />
              </div>
            </span>
          )
        }
      ]
    };
  }

  render() {
    const { dataSource, columns } = this.state;
    return <EdiTable dataSource={dataSource} columns={columns} />;
  }
}

export default Inventory;
