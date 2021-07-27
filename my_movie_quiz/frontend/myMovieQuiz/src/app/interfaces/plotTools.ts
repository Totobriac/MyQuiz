export interface PlotTools {
  fontSize: number;
  fontFamily: {
    index: number,
    value: string,
    display: string,
  };
  background: {
    author_name: string;
    highUrl: string;
    id: number;
    lowUrl: string;
    stock_name: string;
  };
  backgrounds: any
  opacity: number;
  corner: {
    index: number;
    value: string;
  };
  weight: string;
  border: {
    index: number;
    value: string;
  };
  backColor: any;
  fontColor: any;
  borderColor: any;
  palette: string;
  card: string;
  editable: boolean;
  plot: string;
}
