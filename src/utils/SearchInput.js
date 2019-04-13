import React from "react";
import { Select } from "antd";
import memoize from "memoize-one";

const Option = Select.Option;

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined
    };
  }

  handleSearch = value => {
    if (this.props.handleSearch) this.props.handleSearch(value);
    this.setState({ value: value.toLowerCase() });
  };

  handleChange = value => {
    if (this.props.handleChange) this.props.handleChange(value);
    this.setState({ value });
  };
  filter = memoize((list, filterText) => {
    if (!filterText) {
      return list;
    }
    return list.filter(item => item.text.toLowerCase().includes(filterText));
  });
  render() {
    const { value } = this.state;
    const { placeholder, style, data, firstValue } = this.props;
    const filteredData = this.filter(data, value);

    const options = filteredData.map(d => (
      <Option key={d.text}>{d.text}</Option>
    ));
    return (
      <Select
        showSearch
        value={value}
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption={firstValue}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        //try with onclick
        notFoundContent={null}
      >
        {options}
      </Select>
    );
  }
}
SearchInput.defaultProps = {
  firstValue: false
};
export default SearchInput;
