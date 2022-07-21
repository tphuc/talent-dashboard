import { blackA } from "@radix-ui/colors";
import { Pagination } from "components/Pagination";
import Select from "components/Select";
import { Text } from "components/Text";
import { useState } from 'react'
import ContentLoader from 'react-content-loader'




export default function PaginatedList({ items = null, maxPerPage = 10, renderItem = (item, id) => null, style }) {


  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]=useState(maxPerPage)
  let data = items?.slice ? items?.slice((currentPage - 1) * pageSize, currentPage * pageSize) : []
  console.log(data.length)

  return <div style={{ display: "flex", flexDirection: "column", gap: 10, ...style }}>
    {!items && <ContentLoader
      speed={2}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#d9d9d9"
      foregroundColor="#ededed"
    >
      <rect x="0" y="6" rx="4" ry="4" width="400" height="38" />

      <rect x="0" y="55" rx="4" ry="4" width="400" height="38" />
      <rect x="0" y="104" rx="4" ry="4" width="400" height="38" />
      <rect x="8" y="104" rx="4" ry="4" width="400" height="38" />
    </ContentLoader>}
    {data?.map((item, id) => renderItem(item, id))}
    {items?.length == 0 ? <Text css={{ color: "$mauve9" }}>data is empty</Text> :
    <div style={{ marginTop: 5, display: "inline-flex", justifyContent:"flex-end", float: "right",    alignItems: "center",  }}>
      <div style={{ display:"flex", alignItems:"center", background: "white", gap:10, padding: '4px 4px', borderRadius: 10, boxShadow: `0 2px 10px ${blackA.blackA2}`,}}>
      <Pagination maxPage={Math.ceil(items?.length / pageSize)} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}></Pagination>
      <Select placeholder="page size" defaultSelectedKey={'10'} onSelectionChange={(val) => {
        setPageSize(parseInt(val))
        setCurrentPage(1)
      }}>
                <Select.Item key={'10'} textValue="10">10 per page</Select.Item>
                <Select.Item key={'20'} textValue="20">20 per page</Select.Item>
                <Select.Item key={'30'} textValue="30">30 per page</Select.Item>
                <Select.Item key={'40'} textValue="40">40 per page</Select.Item>
                <Select.Item key={'50'} textValue="50">50 per page</Select.Item>

            </Select>
      </div>
      </div>
      }


  </div>


};