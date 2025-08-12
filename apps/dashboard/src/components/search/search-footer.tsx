import { Icons } from "@unstage/ui/components/icons";

export function SearchFooter() {
  return (
    <div className="search-footer flex px-3 h-[40px] w-full border-t border-border mt-auto items-center bg-background backdrop-filter dark:border-[#2C2C2C] backdrop-blur-lg dark:bg-[#151515]/[99]">
      <div className="scale-65 dark:opacity-50 -ml-1">
        <Icons.LogoMark />
      </div>

      <div className="ml-auto flex space-x-2">
        <div className="size-6 select-none items-center border border-border bg-accent flex justify-center">
          <Icons.ArrowUpward className="size-3 dark:text-[#666666] text-black" />
        </div>

        <div className="size-6 select-none items-center border border-border bg-accent flex justify-center">
          <Icons.ArrowDownward className="size-3 dark:text-[#666666] text-black" />
        </div>

        <div className="size-6 select-none items-center border border-border bg-accent flex justify-center">
          <Icons.SubdirectoryArrowLeft className="size-3 dark:text-[#666666] text-black" />
        </div>
      </div>
    </div>
  );
}
