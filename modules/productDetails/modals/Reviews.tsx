import { Dispatch, SetStateAction, useState } from 'react';

import { useApolloClient } from '@apollo/client';
import { AiFillStar, AiOutlineClose, AiOutlineStar } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';

import LoaderButton from '@/common/components/button/components/LoaderButton';
import { REVIEW } from '@/common/graphql/mutation/REVIEW';
import { useModal } from '@/common/recoil/modal';
import userAtom from '@/common/recoil/user';

const Review = ({
  review: {
    attributes: {
      user: {
        data: {
          attributes: { username },
        },
      },
      stars,
      content,
      createdAt,
    },
  },
}: {
  review: Review;
}) => {
  const date = new Date(createdAt);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(date);

  return (
    <div className="flex w-full gap-5">
      <div className="flex flex-col">
        <h2 className="font-bold">{username}</h2>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <>{index < stars ? <AiFillStar /> : <AiOutlineStar />}</>
          ))}
        </div>
        <h6 className="text-xs text-zinc-500">{formattedDate}</h6>
      </div>

      <p className="pr-5">{content}</p>
    </div>
  );
};

const CreateReview = ({
  productId,
  setReviews,
}: {
  productId: string;
  setReviews: Dispatch<SetStateAction<Review[]>>;
}) => {
  const { id } = useRecoilValue(userAtom);
  const { mutate } = useApolloClient();

  const { closeModal, openModal } = useModal();

  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState(5);
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    mutate<{ createReview: { data: Review } }>({
      mutation: REVIEW,
      variables: {
        stars,
        content,
        productId,
      },
    })
      .then((res) => {
        if (res.data)
          setReviews((prev) => [(res.data as any).createReview.data, ...prev]);

        closeModal();
        setLoading(false);
      })
      .catch((err) => {
        openModal(
          <div className="relative rounded-md bg-white p-10 text-xl font-semibold">
            <button
              className="btn-icon absolute right-3 top-3"
              onClick={() => closeModal()}
            >
              <AiOutlineClose />
            </button>
            {err.message}
          </div>
        );
        setLoading(false);
      });
  };

  if (!id)
    return (
      <h3 className="text-center font-semibold text-zinc-700">
        Login to create review!
      </h3>
    );

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-2 text-xl font-semibold leading-none">
        Create a review
      </h2>
      <div>
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            onClick={() => setStars(index + 1)}
            className="text-xl"
            type="button"
          >
            {index < stars ? <AiFillStar /> : <AiOutlineStar />}
          </button>
        ))}
      </div>
      <textarea
        className="input h-20 w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <LoaderButton type="submit" loading={loading} className="w-24 py-0">
        Create
      </LoaderButton>
    </form>
  );
};

const Reviews = ({
  reviews,
  productId,
  setReviews,
}: {
  reviews: Review[];
  productId: string;
  setReviews: Dispatch<SetStateAction<Review[]>>;
}) => {
  const { closeModal } = useModal();

  return (
    <div className="relative rounded-md bg-white p-10 pb-14 sm:w-[35rem] md:w-160">
      <button
        className="btn-icon absolute right-5 top-5"
        onClick={() => closeModal()}
      >
        <AiOutlineClose />
      </button>
      <h1 className="text-center text-2xl font-bold leading-10">Reviews</h1>
      <CreateReview productId={productId} setReviews={setReviews} />
      <div className="mt-5 flex max-h-[35rem] flex-col gap-5 overflow-scroll">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
