import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import {
  ThemeGray1,
  ThemeWhite,
  ThemeGray5,
} from '@utils/constants/themeColor';
import { numberToMonetary } from '@utils/functions';

export default function CartCouponModal({
  setModalState,
  storeName,
  couponArray,
  contentTotalPrice,
}) {
  const closeModal = () => {
    setModalState(false);
  };

  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef();

  useEffect(() => {
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalState(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <BackgroundDIM>
      <ModalContainer ref={modalRef} className="modal-container">
        <TopSection>
          <button onClick={closeModal}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill={ThemeGray1}
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                fillRule="nonzero"
                d="M6 4.6L10.3.3l1.4 1.4L7.4 6l4.3 4.3-1.4 1.4L6 7.4l-4.3 4.3-1.4-1.4L4.6 6 .3 1.7 1.7.3 6 4.6z"
              />
            </svg>
          </button>
        </TopSection>
        <DetailSection>
          <ModalTitleSection>{storeName}에서 사용가능한 쿠폰</ModalTitleSection>
          <ModalTableSection>
            <ShowCouponTable
              couponDto={couponArray}
              contentTotalPrice={contentTotalPrice}
            />
          </ModalTableSection>
        </DetailSection>
      </ModalContainer>
    </BackgroundDIM>
  );
}

function ShowCouponTable({ couponDto, contentTotalPrice }) {
  if (couponDto && couponDto.length > 0) {
    return (
      <CouponTable className="coupon-table">
        <thead className="text-m uppercase">
          <tr className="bg-white border-b">
            <th className="text-sm font-medium text-gray-900 px-6 py-4 ">
              쿠폰이름
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 ">
              쿠폰설명
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 ">
              할인금액
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4">
              적용후금액
            </th>
          </tr>
        </thead>
        <tbody className="text-m">
          {couponDto &&
            couponDto.map((coupon, index) => (
              <CouponTableRow
                key={coupon.couponName + index}
                couponName={coupon.couponName}
                type={coupon.type}
                discountValue={coupon.discountValue}
                discountPrice={coupon.totalFee}
                contentTotalPrice={contentTotalPrice}
              />
            ))}
        </tbody>
      </CouponTable>
    );
  } else {
    return <div>쿠폰이 없습니다.</div>;
  }
}

function CouponTableRow({
  couponName,
  type,
  discountValue,
  discountPrice,
  contentTotalPrice,
}) {
  let description = '';
  if (type === 'RATE') {
    description = discountValue + '%';
  } else if (type === 'AMOUNT') {
    description = discountValue + '원';
  } else {
    description = discountValue;
  }

  description = description + ' 할인쿠폰';

  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <span>{couponName}</span>
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {description}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {numberToMonetary(discountPrice)}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {numberToMonetary(contentTotalPrice - discountPrice) || 0}
      </td>
    </tr>
  );
}

const BackgroundDIM = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: ${ThemeGray5};
  border: 1px solid black;
  border-radius: 8px;

  /* 모달창 크기 */
  @media (max-width: 1024px) {
    width: 90%;
  }
  @media (min-width: 1024px) {
    width: 800px;
  }
`;

const TopSection = styled.div`
  text-align: right;
  padding: 5px 10px;
`;

const DetailSection = styled.div`
  text-align: center;
`;

const ModalTitleSection = styled.div`
  margin: 0 30px;
  background-color: ${ThemeWhite};
  font-size: 1.5rem;
  font-weight: bolder;
  border-radius: 1rem;
`;

const ModalTableSection = styled.div`
  margin: 30px 0;
`;

const CouponTable = styled.table`
  margin: 5%;
  width: 90%;
  text-align: center;
  border-radius: 10px;
  max-height: 400px;
  overflow: auto;
`;
