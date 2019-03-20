import {
  Button,
  Divider,
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  message,
  Icon
} from "antd";
import Highlighter from "react-highlight-words";
import React from "react";
import "../styles.css";

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber min={1} />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Por favor escribe un valor`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.products);
    this.state = {
      data: this.props.products,
      editingKey: "",
      searchText: "",
      filteredInfo: null,
      sortedInfo: null
    };

    this.columns = [
      {
        title: "Clave",
        dataIndex: "clave",
        width: "10%",
        ...this.getColumnSearchProps("clave")
      },
      {
        title: "Linea",
        dataIndex: "linea",
        width: "10%"
      },
      {
        title: "Corrida",
        dataIndex: "corrida",
        width: "10%"
      },
      {
        title: "Color",
        dataIndex: "color",
        width: "20%"
      },
      {
        title: "Pares",
        dataIndex: "pares",
        width: "10%",
        editable: true
      },
      {
        title: "Precio",
        dataIndex: "precio",
        width: "10%"
      },
      {
        title: "Familia",
        dataIndex: "familia",
        width: "10%"
      },
      {
        title: "Descripcion",
        dataIndex: "descripcion",
        width: "40%",
        ...this.getColumnSearchProps("descripcion")
      },
      {
        title: "Acciones",
        dataIndex: "acciones",
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <Button
                        shape="circle"
                        icon="check"
                        ghost
                        type="primary"
                        onClick={() => this.save(form, record.key)}
                      />
                    )}
                  </EditableContext.Consumer>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Estas seguro que quieres cancelar?"
                    onConfirm={() => this.cancel(record.key)}
                    placement="topRight"
                    okText="Si, cancelar"
                    cancelText="No, seguir editando"
                  >
                    <Button type="danger" shape="circle" icon="close" ghost />
                  </Popconfirm>
                </span>
              ) : (
                <div className="icons-list">
                  <Button
                    type="primary"
                    shape="circle"
                    icon="edit"
                    ghost
                    onClick={() => this.edit(record.key)}
                  />
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Estas seguro que quieres eliminar este producto?"
                    onConfirm={() => this.delete(record.key)}
                    placement="topRight"
                    okText="Si, eliminar"
                    cancelText="No, cancelar"
                  >
                    <Button type="danger" shape="circle" icon="delete" ghost />
                  </Popconfirm>
                </div>
              )}
            </div>
          );
        }
      }
    ];
  }
  isEditing = record => record.key === this.state.editingKey;
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Buscar por ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Buscar
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reiniciar
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  cancel = () => {
    this.setState({ editingKey: "" });
  };
  delete(key) {
    this.props.deleteProduct(key);
  }
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
      message.success("Guardado");
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "pares" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <Table
        components={components}
        bordered
        dataSource={this.props.products}
        columns={columns}
        rowClassName="editable-row"
        locale={{ emptyText: "Agrega un producto al carrito para iniciar" }}
      />
    );
  }
}

export default EditableTable;
