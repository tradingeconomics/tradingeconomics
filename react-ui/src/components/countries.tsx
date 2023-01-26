import React, { useEffect } from "react";
import { Dropdown } from "@nextui-org/react";
import Flag from 'react-world-flags'



export default function Countries(props) {
  const countries = props.country_list || [];
  return (
    <Dropdown>
      <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
      <Flag style={{'width': '20px', 'marginRight': '20px'}} code={ countries[props.selectedCountry]['flag_country']} />{countries[props.selectedCountry]['country_name']}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="secondary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={props.selectedCountry}
        onSelectionChange={(e) => props.setSelectedCountry(e['currentKey'])}
      >
        {countries.map((item,idx) => {
            return <Dropdown.Item key={idx}><Flag style={{'width': '20px', 'marginRight': '20px'}} code={ item['flag_country']} />{item['country_name']}</Dropdown.Item>
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
