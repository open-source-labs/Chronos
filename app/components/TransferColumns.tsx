import React, { useState, useContext, useEffect, useRef } from 'react';
import { useIsMount } from '../context/helpers';
import 'antd/dist/antd.less';
import { Switch, Table, Tag, Transfer, Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import difference from 'lodash/difference';
import { QueryContext } from '../context/QueryContext';
import { HealthContext } from '../context/HealthContext';
import { EventContext } from '../context/EventContext';
import AvQueuePlayNext from 'material-ui/svg-icons/av/queue-play-next';

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

const TransferColumns = React.memo(() => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [metricsPool, setMetricsPool] = useState<any[]>([]);
  const [listReady, setListReady] = useState(false);
  const [isEvent, setIsEvent] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const { setSelectedMetrics } = useContext(QueryContext);
  const {healthData} = useContext(HealthContext);
  const { eventData } = useContext(EventContext);
  const eventDataList = eventData.eventDataList;
  const healthDataList = healthData.healthDataList;

  // const datalist = [
  //   {
  //     Memory: [
  //       { books: [{ disk_usage: [10, 20] }, { clockSpeed: [8, 16] }] },
  //       { orders: [{ disk_usage: [5, 25] }, { clockSpeed: [7, 14] }] },
  //     ],
  //   },
  //   {
  //     CPU: [{ books: [{ cpu_temp: [100, 200] }] }, { orders: [{ cpu_temp: [150, 250] }] }],
  //   },
  // ];

  const appendMetrics = (eventDataList, healthDatalist) => {
    let pool: any[] = [];
    if (healthDatalist && healthDatalist.length > 0) {
      setIsEvent(false);
      healthDatalist.forEach(category => {
        const tag: string = Object.keys(category)[0]; //Memory
        const serviceObj: {} = category[tag][0]; // { books: [{ disk_usage: [10, 20] }, { clockSpeed: [8, 16] }] }
        const valuesOfServiceObj: any[] = Object.values(serviceObj);
        const metricsArr: any[] = valuesOfServiceObj[0]; //[{ disk_usage: [10, 20] }, { clockSpeed: [8, 16] }]
        metricsArr.forEach(element => {
          //{ disk_usage: [10, 20] }
          const temp = {};
          const metricName: string = Object.keys(element)[0];
          const key = tag + ' | ' + metricName;
          temp['key'] = key;
          temp['title'] = key;
          temp['tag'] = tag;
          pool.push(temp);
        });
      });

    }
    if (eventDataList && eventDataList.length > 0) {
      setIsEvent(true);
      eventDataList.forEach(metric => {
        const temp = {};
        const metricName: string = Object.keys(metric)[0];
        const key = 'Event | ' + metricName;
        temp['key'] = key;
        temp['title'] = key;
        temp['tag'] = 'Event';
        pool.push(temp);
      });

    }

    setMetricsPool(pool);
  };

  useEffect(() => {
    if ((healthDataList && healthDataList.length >0)  || (eventDataList && eventDataList.length > 0)) {
      setListReady(true);
    }
  }, [healthDataList, eventDataList]);


  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      appendMetrics(eventDataList, healthDataList);
    }
  }, [isEvent, listReady]);

  const leftTableColumns = [
    {
      dataIndex: 'title',
      title: 'Metrics',
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
      title: 'Selected Metrics',
    },
  ];

  const onChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  const triggerDisable = checked => {
    setDisabled(checked);
  };

  const triggerShowSearch = checked => {
    setShowSearch(checked);
  };
  const handleClick = () => {
    //setSelectedMetrics
    const temp: any[] = [];
    const categorySet = new Set();
    for (let i = 0; i < targetKeys.length; i++) {
      let str: string = targetKeys[i];
      const strArr: string[] = str.split(' | ');
      const categoryName = strArr[0];
      const metricName = strArr[1];
      if (categorySet.has(categoryName)) {
        temp.forEach(element => {
          if (Object.keys(element)[0] === categoryName) {
            const metricsList: any[] = element[categoryName];
            metricsList.push(metricName);
          }
        });
      } else {
        categorySet.add(categoryName);
        const newCategory = {};
        newCategory[categoryName] = [metricName];
        temp.push(newCategory);
      }
    }
    setSelectedMetrics(temp);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleClick}
        shape="round"
        size="middle"
        style={{
          marginLeft: 16,
          marginTop: 330,
          float: 'right',
        }}
      >
        Get Charts
      </Button>
      <TableTransfer
        dataSource={metricsPool}
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
