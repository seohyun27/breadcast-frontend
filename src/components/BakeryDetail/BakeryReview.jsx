import React from 'react';
import './BakeryReview.css';

function BakeryReview({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div className="bakery-review-empty">등록된 리뷰가 없습니다.</div>;
  }

  return (
    <div className="bakery-review-list">
      {reviews.map((review) => (
        <div key={review.id || `${review.writer}-${review.date}`} className="bakery-review-item">
          <div className="bakery-review-header">
            <div className="bakery-review-user">
              <div className="bakery-review-avatar">👤</div>
              <span className="bakery-review-name">{review.userName || review.writer}</span>
            </div>
            <div className="bakery-review-actions">
              <button type="button">🖊️ 리뷰 작성</button>
              <span>|</span>
              <button type="button">수정</button>
              <span>|</span>
              <button type="button">삭제</button>
            </div>
          </div>

          {review.photo && (
            <div className="bakery-review-photo">
              <img src={review.photo} alt="리뷰 사진" />
            </div>
          )}

          <div className="bakery-review-text">{review.content || review.text}</div>
        </div>
      ))}
    </div>
  );
}

export default BakeryReview;

