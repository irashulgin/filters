import { Select } from "antd";
const { Option } = Select;
const SelectField = (props) => {
    // const [value,setValue]=useState(props.value);
    // const [items,setItems]=useState(props.items);
  
    // useEffect(()=>{
    //     setValue(props.value);
    // },[props.value]);
  
    // useEffect(()=>{
    //     setItems(props.items);
    // },[props.items]);
    const { value, items, mode, onChange, placeholder } = props;
  
    return (
      <Select
        onChange={onChange}
        value={value}
        mode={mode}
        style={{ width: 200, margin: "10px" }}
      >
        <Option value="" selected disabled>
          {placeholder}
        </Option>
        {items.map((item) => {
          return (
            <Option key={item} value={item}>
              {item}
            </Option>
          );
        })}
      </Select>
    );
  };
  export default SelectField;