import { Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { ProductReview } from '../types/database';

interface ReviewsListProps {
  reviews: ProductReview[];
  onHelpful?: (reviewId: string) => void;
}

export function ReviewsList({ reviews, onHelpful }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-xl text-gray-600 font-medium mb-2">No reviews yet</p>
        <p className="text-gray-500">Be the first to review this product!</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= review.rating
                          ? 'fill-orange-500 text-orange-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {review.is_verified_purchase && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Verified Purchase
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {review.title}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{review.customer_name}</span>
                <span>•</span>
                <span>{formatDate(review.created_at)}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            {review.review}
          </p>

          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mb-4">
              {review.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Review image ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 pt-4 border-t">
            <button
              onClick={() => onHelpful?.(review.id)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful_count})</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

interface ReviewsSummaryProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
}

export function ReviewsSummary({ reviews, averageRating, totalReviews }: ReviewsSummaryProps) {
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-orange-600 mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= Math.round(averageRating)
                    ? 'fill-orange-500 text-orange-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">
            Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        <div className="flex-1 space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 w-12">
                {rating} star
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
