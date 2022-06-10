import React, { useState } from 'react';
import 'antd/dist/antd.less';
import { Switch, Table, Tag, Transfer } from 'antd';
import difference from 'lodash/difference';

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: item => ({
          disabled: listDisabled || item.disabled,
        }),

        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },

        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },

        selectedRowKeys: listSelectedKeys,
      };
      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{
            pointerEvents: listDisabled ? 'none' : undefined,
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const categories = ['CPU', 'Memory', 'Process / Services', 'Network', 'Event'];
// const mockData = Array.from({
//   length: 20,
// }).map((_, i) => ({
//   key: `content${i + 1}`,
//   title: `content${i + 1}`,
//   tag: categories[i % 3],
// }));
const mockData = [
  {
    key: 'CPU | Metric1',
    title: 'CPU | Metric1',
    tag: 'CPU',
  },
  {
    key: 'CPU | Metric2',
    title: 'CPU | Metric2',
    tag: 'CPU',
  },
  {
    key: 'Memory | Metric3',
    title: 'Memory | Metric3',
    tag: 'Memory', 
  },
  {
    key: 'Memory | Metric4',
    title: 'Memory | Metric4',
    tag: 'Memory', 
  },
];
// const originTargetKeys = mockData
//   .filter((item) => Number(item.key) % 3 > 1)
//   .map((item) => item.key);
const originTargetKeys = [];
const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Metric',
  },
  {
    dataIndex: 'tag',
    title: 'Category',
    render: tag => <Tag>{tag}</Tag>,
  },
];
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: 'Metric',
  },
];

const TransferColumns = React.memo(() => {
  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  const onChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  const triggerDisable = checked => {
    setDisabled(checked);
  };

  const triggerShowSearch = checked => {
    setShowSearch(checked);
  };

  return (
    <>
      <TableTransfer
        dataSource={mockData}
        targetKeys={targetKeys}
        disabled={disabled}
        showSearch={showSearch}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
        listStyle={{
          width: 700,
          height: 700,
        }}
      />
      <Switch
        unCheckedChildren="disabled"
        checkedChildren="disabled"
        checked={disabled}
        onChange={triggerDisable}
        style={{
          marginTop: 16,
        }}
      />
      <Switch
        unCheckedChildren="showSearch"
        checkedChildren="showSearch"
        checked={showSearch}
        onChange={triggerShowSearch}
        style={{
          marginTop: 16,
        }}
      />
    </>
  );
});

export default TransferColumns;
