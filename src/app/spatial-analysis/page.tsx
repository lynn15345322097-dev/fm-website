'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { getSpatialStats, getAllMuseums } from '@/lib/museums';
import type { SpatialStats } from '@/lib/museums';
import {
  MapPin,
  Building2,
  PieChart,
  BarChart3,
  Globe,
  CheckCircle2,
  Layers,
} from 'lucide-react';

// ECharts wrapper - ssr: false to avoid hydration mismatch
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

// Province name mapping: museum province names → DataV GeoJSON province names
const PROVINCE_NAME_MAP: Record<string, string> = {
  '北京': '北京市',
  '天津': '天津市',
  '上海': '上海市',
  '重庆': '重庆市',
  '河北': '河北省',
  '山西': '山西省',
  '辽宁': '辽宁省',
  '吉林': '吉林省',
  '黑龙江': '黑龙江省',
  '江苏': '江苏省',
  '浙江': '浙江省',
  '安徽': '安徽省',
  '福建': '福建省',
  '江西': '江西省',
  '山东': '山东省',
  '河南': '河南省',
  '湖北': '湖北省',
  '湖南': '湖南省',
  '广东': '广东省',
  '海南': '海南省',
  '四川': '四川省',
  '贵州': '贵州省',
  '云南': '云南省',
  '陕西': '陕西省',
  '甘肃': '甘肃省',
  '青海': '青海省',
  '台湾': '台湾省',
  '内蒙古': '内蒙古自治区',
  '广西': '广西壮族自治区',
  '西藏': '西藏自治区',
  '宁夏': '宁夏回族自治区',
  '新疆': '新疆维吾尔自治区',
  '香港': '香港特别行政区',
  '澳门': '澳门特别行政区',
};

const REGION_COLORS: Record<string, string> = {
  '华北地区': '#8b1a1a',
  '华东地区': '#d4a04a',
  '东北地区': '#2563eb',
  '华中地区': '#16a34a',
  '华南地区': '#ea580c',
  '西南地区': '#7c3aed',
  '西北地区': '#0891b2',
  '港澳台地区': '#db2777',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useChinaGeoJSON(): any {
  const [geoJSON, setGeoJSON] = useState<any>(null);
  useEffect(() => {
    fetch('/geojson/china-provinces.json')
      .then((r) => r.json())
      .then(setGeoJSON)
      .catch(console.error);
  }, []);
  return geoJSON;
}

export default function SpatialAnalysisPage() {
  const stats = useMemo(() => getSpatialStats(), []);
  const chinaGeoJSON = useChinaGeoJSON();
  const museums = useMemo(() => getAllMuseums(), []);
  const [echartsReady, setEchartsReady] = useState(false);

  useEffect(() => {
    setEchartsReady(true);
  }, []);

  // Province distribution data for choropleth
  const provinceMapData = useMemo(() => {
    const data: { name: string; value: number }[] = [];
    const unmatched: string[] = [];
    for (const s of stats.provinceStats) {
      const geoName = PROVINCE_NAME_MAP[s.province];
      if (geoName) {
        data.push({ name: geoName, value: s.count });
      } else {
        unmatched.push(s.province);
      }
    }
    if (unmatched.length) {
      console.warn('Unmatched provinces for choropleth:', unmatched);
    }
    return data;
  }, [stats.provinceStats]);

  // Region chart data
  const regionChartData = useMemo(() => {
    return stats.regionStats.map((r) => ({
      name: r.region,
      value: r.count,
      visited: r.visited,
      itemStyle: { color: REGION_COLORS[r.region] ?? '#78716c' },
    }));
  }, [stats.regionStats]);

  // Type chart data
  const typeChartData = useMemo(() => {
    return stats.typeStats.map((t) => ({ name: t.type, value: t.count }));
  }, [stats.typeStats]);

  // Nature chart data
  const natureChartData = useMemo(() => {
    return stats.natureStats.map((n) => ({ name: n.nature, value: n.count }));
  }, [stats.natureStats]);

  // Province top 10
  const provinceTop10 = useMemo(() => {
    return stats.provinceStats.slice(0, 10);
  }, [stats.provinceStats]);

  // Choropleth option
  const choroplethOption = useMemo(() => {
    if (!chinaGeoJSON) return null;
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} 个展示空间',
      },
      visualMap: {
        min: 0,
        max: Math.max(...provinceMapData.map((d) => d.value), 1),
        text: ['多', '少'],
        realtime: false,
        calculable: true,
        inRange: { color: ['#fef3c7', '#d4a04a', '#8b1a1a'] },
        textStyle: { color: '#57534e' },
      },
      series: [
        {
          name: '电影展示空间',
          type: 'map',
          map: 'china',
          roam: true,
          emphasis: {
            label: { show: true, color: '#1c1917' },
            itemStyle: { areaColor: '#e0b860' },
          },
          itemStyle: {
            borderColor: '#f5f0e8',
            borderWidth: 1,
          },
          data: provinceMapData,
        },
      ],
    };
  }, [chinaGeoJSON, provinceMapData]);

  // Region bar option
  const regionBarOption = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: { name: string; value: number; seriesName: string }[]) => {
        const p = params[0];
        const region = stats.regionStats.find((r) => r.region === p.name);
        return `${p.name}<br/>总数: ${p.value}<br/>已考察: ${region?.visited ?? 0}`;
      },
    },
    grid: { left: '3%', right: '10%', bottom: '3%', top: '8%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#78716c' },
      axisLine: { lineStyle: { color: '#d6d3d1' } },
    },
    yAxis: {
      type: 'category',
      data: regionChartData.map((r) => r.name).reverse(),
      axisLabel: { color: '#57534e', fontSize: 12 },
      axisLine: { lineStyle: { color: '#d6d3d1' } },
    },
    series: [
      {
        name: '总数',
        type: 'bar',
        data: regionChartData.reverse().map((r) => ({
          value: r.value,
          itemStyle: r.itemStyle,
        })),
        barWidth: 24,
        label: { show: true, position: 'right', color: '#78716c' },
      },
    ],
  }), [regionChartData, stats.regionStats]);

  // Type pie option
  const typePieOption = useMemo(() => ({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: '#57534e', fontSize: 12 },
    },
    series: [
      {
        name: '空间类型',
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 4, borderColor: '#f5f0e8', borderWidth: 2 },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' },
        },
        data: typeChartData,
      },
    ],
  }), [typeChartData]);

  // Nature pie option
  const naturePieOption = useMemo(() => ({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: '#57534e', fontSize: 12 },
    },
    series: [
      {
        name: '机构性质',
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 4, borderColor: '#f5f0e8', borderWidth: 2 },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' },
        },
        data: natureChartData,
      },
    ],
  }), [natureChartData]);

  // Province bar option (top 10)
  const provinceBarOption = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: { left: '3%', right: '10%', bottom: '3%', top: '8%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#78716c' },
      axisLine: { lineStyle: { color: '#d6d3d1' } },
    },
    yAxis: {
      type: 'category',
      data: provinceTop10.map((p) => p.province).reverse(),
      axisLabel: { color: '#57534e', fontSize: 12 },
      axisLine: { lineStyle: { color: '#d6d3d1' } },
    },
    series: [
      {
        name: '总数',
        type: 'bar',
        data: provinceTop10.reverse().map((p) => ({
          value: p.count,
          itemStyle: {
            color: p.visited > 0
              ? '#8b1a1a'
              : '#d4a04a',
          },
        })),
        barWidth: 20,
        label: { show: true, position: 'right', color: '#78716c' },
      },
    ],
  }), [provinceTop10]);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs tracking-[0.16em] text-amber-gold/70">
            SPATIAL ANALYSIS
          </p>
          <h1 className="font-serif text-3xl text-stone-950">
            空间分析
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-stone-600 leading-7">
            基于 GIS 方法对中国电影展示空间进行多维度统计分析，涵盖地理分布、区域格局、空间类型与机构性质等维度。
          </p>
        </div>

        {/* Overview stats cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-gold/10">
                <Building2 className="h-5 w-5 text-amber-gold" />
              </div>
              <div>
                <p className="text-xs text-stone-500">总样本数</p>
                <p className="text-2xl font-bold text-stone-950">{stats.totalCount}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-xs text-stone-500">已实地考察</p>
                <p className="text-2xl font-bold text-stone-950">
                  {stats.visitedCount}
                  <span className="ml-1 text-sm font-normal text-stone-500">
                    / {((stats.visitedCount / stats.totalCount) * 100).toFixed(0)}%
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <Globe className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-xs text-stone-500">覆盖省份</p>
                <p className="text-2xl font-bold text-stone-950">{stats.provinceStats.length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                <Layers className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <p className="text-xs text-stone-500">空间类型</p>
                <p className="text-2xl font-bold text-stone-950">{stats.typeStats.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Choropleth map + Region bar */}
        <div className="mb-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm">
            <h2 className="mb-4 font-serif text-lg text-stone-900">省级分布填色图</h2>
            <p className="mb-4 text-xs text-stone-500">
              数据来源：DataV.GeoAtlas 中国省级行政区划 GeoJSON（仅用于学术研究）
            </p>
            {echartsReady && chinaGeoJSON != null && choroplethOption != null && (
              <ReactECharts
                option={choroplethOption}
                style={{ height: 520 }}
                onChartReady={(chart) => {
                  try {
                    const instance = (chart as any).getEchartsInstance();
                    instance.registerMap('china', chinaGeoJSON);
                    instance.setOption(choroplethOption, true);
                  } catch (e) {
                    console.error('Failed to register map:', e);
                  }
                }}
                opts={{ renderer: 'canvas' }}
              />
            )}
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm">
            <h2 className="mb-4 font-serif text-lg text-stone-900">区域分布</h2>
            {echartsReady && (
              <ReactECharts option={regionBarOption} style={{ height: 520 }} />
            )}
          </div>
        </div>

        {/* Province top 10 + Type pie + Nature pie */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm">
            <h2 className="mb-4 font-serif text-lg text-stone-900">省份排行 Top 10</h2>
            {echartsReady && (
              <ReactECharts option={provinceBarOption} style={{ height: 380 }} />
            )}
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm">
            <h2 className="mb-4 font-serif text-lg text-stone-900">空间类型占比</h2>
            {echartsReady && (
              <ReactECharts option={typePieOption} style={{ height: 380 }} />
            )}
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm">
            <h2 className="mb-4 font-serif text-lg text-stone-900">机构性质占比</h2>
            {echartsReady && (
              <ReactECharts option={naturePieOption} style={{ height: 380 }} />
            )}
          </div>
        </div>

        {/* Province detail table */}
        <div className="rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm">
          <h2 className="mb-4 font-serif text-lg text-stone-900">省份分布明细</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-xs uppercase text-stone-500">
                  <th className="pb-3 pr-4 font-medium">排名</th>
                  <th className="pb-3 pr-4 font-medium">省份</th>
                  <th className="pb-3 pr-4 font-medium text-right">总数</th>
                  <th className="pb-3 pr-4 font-medium text-right">已考察</th>
                  <th className="pb-3 font-medium text-right">考察率</th>
                </tr>
              </thead>
              <tbody>
                {stats.provinceStats.map((p, i) => (
                  <tr key={p.province} className="border-b border-stone-100 hover:bg-amber-gold/5">
                    <td className="py-3 pr-4 text-stone-400">{i + 1}</td>
                    <td className="py-3 pr-4 font-medium text-stone-800">{p.province}</td>
                    <td className="py-3 pr-4 text-right text-stone-700">{p.count}</td>
                    <td className="py-3 pr-4 text-right text-green-700">{p.visited}</td>
                    <td className="py-3 text-right text-stone-500">
                      {((p.visited / p.count) * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-[11px] text-stone-400 leading-6">
          数据说明：本页统计分析基于中国电影展示空间数据库（{stats.totalCount} 个样本），
          省级行政区划 GeoJSON 数据来源于 DataV.GeoAtlas（阿里云 DataV 数据可视化平台），
          仅供学术研究使用，不涉及任何商业用途。坐标转换遵循 GeoJSON 标准（WGS84 坐标系，经度在前、纬度在后）。
        </p>
      </div>
    </div>
  );
}
