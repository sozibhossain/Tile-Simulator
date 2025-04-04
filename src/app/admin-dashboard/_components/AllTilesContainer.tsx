"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

const AllTilesContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // const session = useSession();
  // const token = (session?.data?.user as { token: string })?.token;
  // console.log(token);

  const { data } = useQuery<ApiResponseTiles>({
    queryKey: ["all tiles", currentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tiles?page=${currentPage}`
      ).then((res) => res.json()),
  });

  console.log(data);

  return (
    <section className="w-full">
      <div className="w-full shadow-[0px_0px_22px_8px_#C1C9E4] h-auto  rounded-[24px] bg-white">
        <TableContainer
          data={data?.data?.data?.data ?? []}
          columns={AllTilesColumn}
        />
      </div>
      <div>
        {data && data?.data && data?.data?.total_pages > 1 && (
          <div className="mt-[30px]  w-full pb-[208px]  flex justify-between">
            <p className="font-normal text-base leading-[120%] text-secondary-100">
              Showing {data?.data?.current_page} from {data?.data?.total_pages}
            </p>
            <div>
              <TilePagination
                currentPage={currentPage}
                totalPages={data?.data?.total_pages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllTilesContainer;
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { AllTilesColumn } from "./AllTilesColumn";
import { ApiResponseTiles, Tile } from "./AllTilesData";
import TilePagination from "@/components/ui/TilePagination";
// import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const TableContainer = ({
  data,
  columns,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: ColumnDef<Tile>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} />
    </>
  );
};
