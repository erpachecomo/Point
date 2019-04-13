import React from "react";
import { Divider, Button, Tag, Table } from "antd";
import EdiTable from "../utils/EdiTable";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./Products.css";

class Products extends React.Component {
  constructor() {
    super();
    const columns = [
      {
        title: "Clave",
        dataIndex: "clave",
        key: "clave"
      },
      {
        title: "Pares",
        dataIndex: "pares",
        key: "pares"
      },
      {
        title: "Descripción",
        dataIndex: "descripcion",
        key: "descripcion"
      },
      {
        title: "Familia",
        dataIndex: "familia",
        key: "familia"
      },
      {
        title: "Precio",
        dataIndex: "precio",
        key: "precio"
      },
      {
        title: "Color",
        dataIndex: "descripcion",
        key: "descripcion"
      }
    ];

    const data = [
      {
        key: 1,
        clave: "John Brown sr.",
        pares: 60,
        descripcion: "New York No. 1 Lake Park",
        children: [
          {
            key: 11,
            clave: "John Brown",
            age: 42,
            address: "New York No. 2 Lake Park"
          },
          {
            key: 12,
            name: "John Brown jr.",
            age: 30,
            address: "New York No. 3 Lake Park",
            children: [
              {
                key: 121,
                name: "Jimmy Brown",
                age: 16,
                address: "New York No. 3 Lake Park"
              }
            ]
          },
          {
            key: 13,
            name: "Jim Green sr.",
            age: 72,
            address: "London No. 1 Lake Park",
            children: [
              {
                key: 131,
                name: "Jim Green",
                age: 42,
                address: "London No. 2 Lake Park",
                children: [
                  {
                    key: 1311,
                    name: "Jim Green jr.",
                    age: 25,
                    address: "London No. 3 Lake Park"
                  },
                  {
                    key: 1312,
                    name: "Jimmy Green sr.",
                    age: 18,
                    address: "London No. 4 Lake Park"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        key: 2,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park"
      }
    ];

    this.state = {
      data,
      columns
    };
  }

  render() {
    const { data, columns } = this.state;
    console.log(columns);
    return (
      <Table dataSource={data} style={{ height: "100%" }} columns={columns} />
    );
  }
}

export default Products;
