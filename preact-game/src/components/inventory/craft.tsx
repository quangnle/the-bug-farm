import { FC, useEffect, useMemo, useState } from "react";
import Button from "../common/button";
import { Select } from "@headlessui/react";
import { handleError } from "@/utils/helpers";
import api from "@/core/axios";

interface IProp {
  inventory?: IInventory;
  fetchInventory: () => void;
}

const CraftGem: FC<IProp> = ({ inventory, fetchInventory }) => {
  const [upgradePercent, setUpgradePercent] = useState(0);
  const [selectedBundleQuantity, setSelectedBundleQuantity] = useState(1);
  const [isCrafting, setIsCrafting] = useState(false);
  const bundles = [
    {
      quantity: 1,
      dewdrop: 10,
      oil: 2,
      rate: 85,
    },
    {
      quantity: 4,
      dewdrop: 20,
      oil: 4,
      rate: 52,
    },
    {
      quantity: 9,
      dewdrop: 30,
      oil: 6,
      rate: 36,
    },
    {
      quantity: 16,
      dewdrop: 40,
      oil: 8,
      rate: 29,
    },
    {
      quantity: 25,
      dewdrop: 50,
      oil: 10,
      rate: 24,
    },
    {
      quantity: 36,
      dewdrop: 60,
      oil: 12,
      rate: 20,
    },
    {
      quantity: 49,
      dewdrop: 70,
      oil: 14,
      rate: 17,
    },
    {
      quantity: 64,
      dewdrop: 80,
      oil: 16,
      rate: 15,
    },
    {
      quantity: 81,
      dewdrop: 90,
      oil: 18,
      rate: 13,
    },
    {
      quantity: 100,
      dewdrop: 100,
      oil: 20,
      rate: 12,
    },
  ];
  const findBundleByQuantity = useMemo(
    () => bundles.find((bundle) => selectedBundleQuantity === bundle.quantity),
    [selectedBundleQuantity]
  );

  const loadingCraftGem = async () => {
    return await new Promise((resolve) => {
      let counter = 0;
      const interval = setInterval(() => {
        setUpgradePercent((prev) => (prev += 1));
        counter++;
        if (counter === 100) {
          clearInterval(interval);
          setUpgradePercent(0);
          resolve("");
        }
      }, 50);
    });
  };

  const handleCraftGem = async () => {
    try {
      const { data } = await api.craftGem({
        quantity: findBundleByQuantity?.quantity,
      });
      setIsCrafting(true);
      await loadingCraftGem();
      if (data.isSuccess) alert("Craft Success!");
      else alert("Craft failed!");
      fetchInventory();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <img src="/assets/gem.png" alt="gem" className="w-40 h-40" />
        <div
          className={`${
            upgradePercent === 0 ? "hidden" : "block"
          }  w-full mt-5 h-2 bg-gray-100`}
        >
          <div
            className={`bg-blue-500 h-full`}
            style={{ width: `${upgradePercent}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-12">
        <div>
          <div className="w-24 h-24 rounded-full border-2 flex justify-center items-center">
            <img
              src="/assets/dewdrop.png"
              alt="dewdrop"
              className="w-14 h-14"
            />
          </div>
          <p className="text-center mt-2">
            <span
              className={`${
                inventory?.dewdrop! < findBundleByQuantity?.dewdrop!
                  ? "text-red-200"
                  : ""
              }`}
            >
              {inventory?.dewdrop}
            </span>{" "}
            /{findBundleByQuantity?.dewdrop}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            disabled={
              inventory?.dewdrop! < findBundleByQuantity?.dewdrop! ||
              inventory?.dewdrop! < findBundleByQuantity?.dewdrop!
            }
            onClick={handleCraftGem}
          >
            Craft ({findBundleByQuantity?.rate}%)
          </Button>
          <select
            defaultValue={bundles[0].quantity}
            onChange={(e) =>
              setSelectedBundleQuantity(parseInt(e.target.value))
            }
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {bundles.map((bundle) => (
              <option key={bundle.quantity} value={bundle.quantity}>
                {bundle.quantity}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="w-24 h-24 rounded-full border-2 flex justify-center items-center">
            <img src="/assets/oil.png" alt="oil" className="w-14 h-14" />
          </div>
          <p className="text-center mt-2">
            <span
              className={`${
                inventory?.dewdrop! < findBundleByQuantity?.dewdrop!
                  ? "text-red-200"
                  : ""
              }`}
            >
              {inventory?.oil}
            </span>{" "}
            /{findBundleByQuantity?.oil}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CraftGem;
