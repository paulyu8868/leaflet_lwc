import { LightningElement, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import LEAFLET_CSS from '@salesforce/resourceUrl/leafletCSS';
import LEAFLET_JS from '@salesforce/resourceUrl/leafletJS';

export default class SimpleLeafletMap extends LightningElement {
    @track searchLocation = '';
    @track isLoading = false;
    @track errorMessage = '';
    @track currentMarkerInfo = null;
    
    map;
    currentMarker;
    isMapInitialized = false;
    
    // 서울시청을 기본 중심점으로 설정
    defaultCenter = {
        lat: 37.5665,
        lng: 126.9780
    };

    connectedCallback() {
        this.loadLeafletResources();
    }

    // Leaflet 리소스 로딩
    async loadLeafletResources() {
        try {
            // CSS와 JS 동시 로딩
            await Promise.all([
                loadStyle(this, LEAFLET_CSS),
                loadScript(this, LEAFLET_JS)
            ]);
            
            console.log('Leaflet 리소스 로딩 완료');
            this.initializeMap();
        } catch (error) {
            console.error('Leaflet 리소스 로딩 실패:', error);
            this.errorMessage = 'Leaflet 라이브러리를 불러올 수 없습니다.';
        }
    }

    // 지도 초기화
    initializeMap() {
        try {
            const mapContainer = this.template.querySelector('.map-div');
            
            if (!mapContainer) {
                console.error('지도 컨테이너를 찾을 수 없습니다');
                return;
            }

            // Leaflet 지도 생성
            this.map = L.map(mapContainer).setView([this.defaultCenter.lat, this.defaultCenter.lng], 13);

            // OpenStreetMap 타일 레이어 추가
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(this.map);

            // 기본 마커 추가 (서울시청)
            this.addMarker(this.defaultCenter.lat, this.defaultCenter.lng, '서울시청');
            
            this.isMapInitialized = true;
            console.log('지도 초기화 완료');
            
        } catch (error) {
            console.error('지도 초기화 실패:', error);
            this.errorMessage = '지도를 초기화할 수 없습니다.';
        }
    }

    // 마커 추가
    addMarker(lat, lng, name) {
        try {
            // 이전 마커 제거
            if (this.currentMarker) {
                this.map.removeLayer(this.currentMarker);
            }

            // 커스텀 아이콘 생성
            const customIcon = L.divIcon({
                html: '<div class="custom-marker"></div>',
                className: 'custom-marker-container',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            // 새 마커 추가
            this.currentMarker = L.marker([lat, lng], { icon: customIcon })
                .addTo(this.map)
                .bindPopup(`<strong>${name}</strong><br>위도: ${lat.toFixed(6)}<br>경도: ${lng.toFixed(6)}`)
                .openPopup();

            // 해당 위치로 지도 이동
            this.map.setView([lat, lng], 15);

            // 현재 마커 정보 업데이트
            this.currentMarkerInfo = {
                name: name,
                lat: lat.toFixed(6),
                lng: lng.toFixed(6)
            };

        } catch (error) {
            console.error('마커 추가 실패:', error);
            this.errorMessage = '마커를 추가할 수 없습니다.';
        }
    }

    // 입력값 변경 핸들러
    handleLocationChange(event) {
        this.searchLocation = event.target.value;
        this.errorMessage = '';
    }

    // 엔터키 입력 핸들러
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.searchLocationHandler();
        }
    }

    // 위치 검색
    async searchLocationHandler() {
        if (!this.searchLocation.trim()) {
            this.errorMessage = '검색할 위치를 입력해주세요.';
            return;
        }

        if (!this.isMapInitialized) {
            this.errorMessage = '지도가 아직 로딩 중입니다. 잠시 후 다시 시도해주세요.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        try {
            // Nominatim API를 사용한 지오코딩
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchLocation)}&limit=1&countrycodes=KR`
            );

            const data = await response.json();

            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);
                const displayName = result.display_name;

                // 마커 추가
                this.addMarker(lat, lng, displayName);
                
                console.log('검색 성공:', displayName);
            } else {
                this.errorMessage = `"${this.searchLocation}"에 대한 검색 결과를 찾을 수 없습니다.`;
            }

        } catch (error) {
            console.error('위치 검색 실패:', error);
            this.errorMessage = '위치 검색 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.';
        } finally {
            this.isLoading = false;
        }
    }
}
