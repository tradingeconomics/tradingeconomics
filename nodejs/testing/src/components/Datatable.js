/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {
  DataGrid,
  GridToolbar,
  gridClasses,
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
} from "@mui/x-data-grid";
import React from "react";

import { alpha, styled } from "@mui/material/styles";
// reactstrap components
import {
  Pagination,
  PaginationItem,
  Paper,
  useMediaQuery,
} from "@mui/material";
//   import "../views/Css.css";

function DataTable({ data }) {
  const matches = useMediaQuery("(min-width:1020px)");
  const columns = data.columns.map((r) => ({
    field: r.accessor,
    headerName: r.Header.toUpperCase(),
    headerClassName: "bd",
    width: r.width ? r.width : 150,
    renderCell: r.renderCell,
    key: r.Value,
  }));
  const ODD_OPACITY = 0.2;

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.odd`]: {
      paddingLeft: "10px",
      "&:hover, &.Mui-hovered": { backgroundColor: "white" },
    },
    [`& .${gridClasses.row}.even`]: {
      paddingLeft: "10px",
      backgroundColor: theme.palette.grey[200],
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),
        "&:hover, &.Mui-hovered": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
  }));
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <div>
        {/* <Typography
            variant="caption"
            style={{ position: "absolute", right: "65vw", margin: "10px" }}
          >
            {data.rows.length} items
          </Typography> */}
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          page={page + 1}
          count={pageCount}
          // @ts-expect-error
          renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            apiRef.current.setPage(value - 1)
          }
        />
      </div>
    );
  }

  const PAGE_SIZE = 10;

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  return (
    <>
      <Paper
        elevation={5}
        style={{
          width: matches ? "73vw" : "90vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        className="table"
      >
        <div style={{ height: 460 }}>
          <StripedDataGrid
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            rows={data.rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[PAGE_SIZE]}
            disableColumnFilter
            disableColumnSelector
            // disableDensitySelector
            disableSelectionOnClick
            sx={{
              backgroundColor: "rgba(224, 224, 224, 0.2)",
              fontWeight: 700,
              ".bd": {
                fontWeight: 800,
                paddingLeft: "20px",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "15px",
                zIndex: 20000,
              },
            }}
            slots={{
              pagination: CustomPagination,
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                // csvOptions: { disableToolbarButton: true },      FOR DISABLING EXPORT OPTION
                printOptions: { disableToolbarButton: true },
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 50 },
              },
            }}
          />
        </div>
      </Paper>
    </>
  );
}

export default DataTable;
