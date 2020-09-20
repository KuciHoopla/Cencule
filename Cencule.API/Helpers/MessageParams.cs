namespace Cencule.API.Helpers
{
    public class MessageParams
    {
        
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        public int pageSize { get; set; } = 10;
        public int MyProperty 
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value ; }
        }

        public int UserId {get; set;}
        public string MessageContainer { get; set; } = "Unread";
    }
}