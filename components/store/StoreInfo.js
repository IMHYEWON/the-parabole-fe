import { ColorBlue2 } from "@utils/constants/themeColor"
import { LineBlue } from '@components/input/Button';
import { ICON_SHOP } from '@utils/constants/icons';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GET_DATA } from "@apis/defaultApi";
import CouponListModal from '@components/coupon/CouponListModal';

export default function StoreInfo({
  total, products, store
}) {
  const [storeId, setStoreId] = useState();
  const [modalState, setModalState] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const router = useRouter();
  console.log('store', router);

  useEffect(() => {
    if (router.query.id) {
      setStoreId(router.query.id);
    }
    if (storeId) {
      GET_DATA(`/coupon/store`, {sellerId : storeId}).then((res) => {
        if (res) {
          console.log(res);
          setCoupons(res.content);
        }
      });
    }

  }, [router.query]);
    
    

  function showBenefitModal(e) {
    e.preventDefault();

    setModalState(true);
  }

  return (
    <>
      <div className="bg-white pb-4">
        <div className="max-w-screen-2xl mx-auto">
          <div className="p-4 md:h-80 flex flex-col sm:flex-row bg-blue-50 rounded-lg overflow-hidden">
            <div className="w-full sm:w-1/2 lg:w-3/5 flex flex-col p-4 sm:p-8">

              <div>
                <img src={ICON_SHOP}/>
                <span className="text-gray-800 text-xl md:text-2xl lg:text-4xl font-bold mb-4">{store}</span>
              </div>
              <p className="max-w-md text-gray-600 mb-8">총 상품 : {total}개</p>


              <div className="flex py-2">
                <LineBlue
                    buttonText="스토어 혜택을 받아보세요!"
                    onClickFunc={(e) => showBenefitModal(e)}
                    css={{ width: '60%', fontWeight: 'bold', }}
                />
              </div>
              <div>
                  {modalState && (
                    <CouponListModal
                      setModalState={setModalState}
                      couponList={coupons}
                      storeName={store}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>    
    </>
  )
}