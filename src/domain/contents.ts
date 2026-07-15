export interface Contents {
  id: string;
  title: string;
  body: string;
  tag: string;
  created: string;
  updated: string;
}

export interface ContentsProps {
  aPropos : Contents;
  contactUs : Contents;
  legal : Contents;
}