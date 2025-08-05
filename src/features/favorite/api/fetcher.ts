import { API } from "@/shared/constants/api";


type FavoriteType = 'term' | 'quiz';


// 북마크 생성
export async function createFavorite(data: { targetId: number; type: FavoriteType }) {
    const res = await fetch(API.FAVORITES.CREATE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (res.status === 401) {
        throw new Error("로그인이 필요합니다.");
    }

    if (res.status === 409) {
        throw new Error("이미 북마크된 항목입니다.");
    }

    if (res.status === 400) {
        throw new Error("targetId, type은 필수입니다.");
    }

    if (res.status === 500) {
        throw new Error("서버 오류가 발생했습니다.");
    }


    if (!res.ok) throw new Error("북마크 생성 실패");

    return res.json();

}


// 북마크 조회
export async function fetchFavorites(type: FavoriteType, page: number, size: number) {
    const res = await fetch(API.FAVORITES.LIST(type, page, size), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) throw new Error("북마크 조회 실패");

    return res.json();
}

// 북마크 삭제
export async function deleteFavorite(id: number, type: FavoriteType) {
    const res = await fetch(API.FAVORITES.DELETE(id, type), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) throw new Error("북마크 삭제 실패");
    return res.json();
}